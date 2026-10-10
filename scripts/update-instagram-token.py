#!/usr/bin/env python3
"""
Pink Papaya Stays — Instagram Token Updater & Validator
Validates the Instagram Graph API Access Token and optionally updates
both local .env and remote VPS .env.
"""

import sys
import json
import argparse
import urllib.request
import urllib.error
import re
from pathlib import Path

try:
    import pexpect
except ImportError:
    pexpect = None

VPS_HOST = "187.127.187.184"
VPS_USER = "root"
VPS_PASS = "P+,1fLHpL22/A9+;"

def test_token(token):
    url = f"https://graph.instagram.com/me?fields=id,username,account_type,media_count&access_token={token}"
    print(f"Testing token against Instagram Graph API...")
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=10) as res:
            data = json.loads(res.read().decode("utf-8"))
            print(f"[TOKEN VALID] Connected as @{data.get('username')} (ID: {data.get('id')}, Media Count: {data.get('media_count')})")
            return True, data
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="ignore")
        print(f"[TOKEN INVALID] HTTP {e.code}: {body}")
        return False, body
    except Exception as e:
        print(f"[CONNECTION ERROR] {e}")
        return False, str(e)

def update_local_env(token):
    env_path = Path(__file__).resolve().parent.parent / ".env"
    if not env_path.exists():
        print(f"[LOCAL] .env file not found at {env_path}")
        return False

    content = env_path.read_text(encoding="utf-8")
    if re.search(r"^INSTAGRAM_ACCESS_TOKEN=", content, flags=re.MULTILINE):
        new_content = re.sub(
            r"^INSTAGRAM_ACCESS_TOKEN=.*$",
            f"INSTAGRAM_ACCESS_TOKEN={token}",
            content,
            flags=re.MULTILINE,
        )
    else:
        new_content = content.rstrip() + f"\nINSTAGRAM_ACCESS_TOKEN={token}\n"

    env_path.write_text(new_content, encoding="utf-8")
    print(f"[LOCAL] Updated INSTAGRAM_ACCESS_TOKEN in {env_path}")
    return True

def update_vps_env(token):
    if not pexpect:
        print("[VPS] 'pexpect' module not available. Skipping VPS remote update.")
        return False

    print(f"[VPS] Connecting to {VPS_HOST} to update .env...")
    script = (
        f'ENV_FILE="/var/www/pink-papaya/.env"\n'
        f'NEW_TOKEN="{token}"\n'
        f'if grep -q "^INSTAGRAM_ACCESS_TOKEN=" "$ENV_FILE"; then\n'
        f"  sed -i 's|^INSTAGRAM_ACCESS_TOKEN=.*|INSTAGRAM_ACCESS_TOKEN='\"$NEW_TOKEN\"'|' \"$ENV_FILE\"\n"
        f"else\n"
        f'  echo "INSTAGRAM_ACCESS_TOKEN=$NEW_TOKEN" >> "$ENV_FILE"\n'
        f"fi\n"
        f'chown papaya:papaya "$ENV_FILE"\n'
        f'chmod 600 "$ENV_FILE"\n'
        f'su - papaya -c "cd /var/www/pink-papaya && pm2 restart all --update-env"\n'
    )

    ssh_cmd = f'ssh -o StrictHostKeyChecking=no {VPS_USER}@{VPS_HOST} "bash -s"'
    child = pexpect.spawn(ssh_cmd, encoding="utf-8", timeout=30)
    idx = child.expect(["password:", "Password:", pexpect.EOF, pexpect.TIMEOUT], timeout=15)
    if idx in [0, 1]:
        child.sendline(VPS_PASS)
        child.sendline(script)
        child.sendline("exit")
        child.expect(pexpect.EOF, timeout=30)
        print("[VPS] Successfully updated remote .env and restarted PM2 with new token.")
        return True
    else:
        print("[VPS] Failed to authenticate over SSH.")
        return False

def main():
    parser = argparse.ArgumentParser(description="Update Instagram Graph API token")
    parser.add_argument("token", nargs="?", help="New Instagram User Access Token")
    parser.add_argument("--test-only", action="store_true", help="Only test the token without updating .env")
    parser.add_argument("--vps", action="store_true", help="Also sync to live VPS")
    args = parser.parse_args()

    token = args.token
    if not token:
        # Read from local .env
        env_path = Path(__file__).resolve().parent.parent / ".env"
        if env_path.exists():
            m = re.search(r"^INSTAGRAM_ACCESS_TOKEN=(.*)$", env_path.read_text(encoding="utf-8"), re.MULTILINE)
            if m:
                token = m.group(1).strip()

    if not token:
        print("Usage: python3 scripts/update-instagram-token.py <YOUR_NEW_TOKEN> [--vps]")
        sys.exit(1)

    valid, _ = test_token(token)
    if not valid:
        print("\nToken validation failed. Please check the token generated from Meta Developer / Instagram Basic Display.")
        if not args.test_only:
            sys.exit(1)

    if args.test_only:
        sys.exit(0 if valid else 1)

    update_local_env(token)
    if args.vps:
        update_vps_env(token)

    print("\nDone! Local dev server will pick up the new token automatically on next request.")

if __name__ == "__main__":
    main()
