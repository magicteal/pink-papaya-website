#!/usr/bin/env python3
"""
Pink Papaya Stays — Automated VPS Deployment & Health Verification Script
Connects via SSH to the production VPS (187.127.187.184), pulls latest main,
rebuilds Next.js, restarts PM2 (papaya user), and verifies live status.
"""

import sys
import time
import argparse
import urllib.request
import ssl

try:
    import pexpect
except ImportError:
    print("Error: 'pexpect' package is required. Install via 'pip install pexpect' or 'sudo apt install python3-pexpect'.")
    sys.exit(1)

VPS_HOST = "187.127.187.184"
VPS_PORT = 22
VPS_USER = "root"
VPS_PASS = "P+,1fLHpL22/A9+;"
REMOTE_DIR = "/var/www/pink-papaya"

DEPLOY_COMMANDS = (
    f"su - papaya -c 'cd {REMOTE_DIR} && "
    f"git fetch origin && "
    f"git reset --hard origin/main && "
    f"npm install && "
    f"npm run build && "
    f"pm2 restart all && "
    f"sleep 2 && "
    f"pm2 list && "
    f"curl -sI http://localhost:3000'"
)

STATUS_COMMANDS = (
    f"su - papaya -c 'pm2 list && curl -sI http://localhost:3000'"
)

def run_ssh_command(cmd, timeout=300):
    print(f"Connecting to {VPS_USER}@{VPS_HOST} via SSH...")
    ssh_cmd = f"ssh -o StrictHostKeyChecking=no {VPS_USER}@{VPS_HOST} \"{cmd}\""
    child = pexpect.spawn(ssh_cmd, encoding="utf-8", timeout=timeout)
    
    idx = child.expect(["password:", "Password:", pexpect.EOF, pexpect.TIMEOUT], timeout=30)
    if idx in [0, 1]:
        child.sendline(VPS_PASS)
    elif idx == 2:
        print("Connected without password prompt.")
    else:
        print("Timeout waiting for SSH password prompt.")
        return False, child.before

    output_lines = []
    try:
        while True:
            line = child.readline()
            if not line:
                break
            output_lines.append(line)
            sys.stdout.write(line)
            sys.stdout.flush()
    except pexpect.TIMEOUT:
        print("\n[SSH Command Timed Out]")
        return False, "".join(output_lines)
    except pexpect.EOF:
        pass

    child.close()
    success = (child.exitstatus == 0)
    return success, "".join(output_lines)

def verify_live_endpoints():
    print("\n--- Verifying Live Endpoints ---")
    
    # 1. Verify Direct IP (Full Site)
    ip_url = f"http://{VPS_HOST}"
    print(f"Testing Live IP: {ip_url} ...")
    ip_ok = False
    try:
        req = urllib.request.Request(ip_url, headers={"User-Agent": "Mozilla/5.0 (PinkPapayaVerifier/1.0)"})
        with urllib.request.urlopen(req, timeout=10) as res:
            if res.status == 200:
                print(f"  [SUCCESS] {ip_url} returned HTTP {res.status} OK (Full Website Active)")
                ip_ok = True
            else:
                print(f"  [WARNING] {ip_url} returned HTTP {res.status}")
    except Exception as e:
        print(f"  [FAILED] {ip_url} error: {e}")

    # 2. Verify Domain (Coming Soon)
    domain_url = "https://pinkpapayastays.com"
    print(f"Testing Production Domain: {domain_url} ...")
    domain_ok = False
    try:
        ctx = ssl.create_default_context()
        req = urllib.request.Request(domain_url, headers={"User-Agent": "Mozilla/5.0 (PinkPapayaVerifier/1.0)"})
        with urllib.request.urlopen(req, timeout=10, context=ctx) as res:
            content = res.read().decode("utf-8", errors="ignore")
            is_coming_soon = "coming soon" in content.lower()
            if res.status == 200 and is_coming_soon:
                print(f"  [SUCCESS] {domain_url} returned HTTP {res.status} OK (Coming Soon rewrite verified)")
                domain_ok = True
            elif res.status == 200:
                print(f"  [NOTICE] {domain_url} returned HTTP 200 (Not 'Coming Soon')")
                domain_ok = True
            else:
                print(f"  [WARNING] {domain_url} returned HTTP {res.status}")
    except Exception as e:
        print(f"  [FAILED] {domain_url} error: {e}")

    return ip_ok and domain_ok

def main():
    parser = argparse.ArgumentParser(description="Pink Papaya VPS Deployment Tool")
    parser.add_argument("--status-only", action="store_true", help="Only check PM2 and server status without rebuilding")
    parser.add_argument("--verify-only", action="store_true", help="Only verify external HTTP endpoints")
    args = parser.parse_args()

    if args.verify_only:
        all_ok = verify_live_endpoints()
        sys.exit(0 if all_ok else 1)

    cmd_to_run = STATUS_COMMANDS if args.status_only else DEPLOY_COMMANDS
    print(f"Starting {'status check' if args.status_only else 'VPS deployment'} on {VPS_HOST}...")

    success, _ = run_ssh_command(cmd_to_run, timeout=400)
    if not success:
        print("\n[ERROR] Deployment command failed on VPS.")
        sys.exit(1)

    print("\nRemote deployment execution finished.")
    endpoints_ok = verify_live_endpoints()
    
    if endpoints_ok:
        print("\n[ALL CHECKS PASSED] VPS deployment and routing verification successful.")
        sys.exit(0)
    else:
        print("\n[WARNING] Server deployed but one or more external checks reported issues.")
        sys.exit(0)

if __name__ == "__main__":
    main()
