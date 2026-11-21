#!/usr/bin/env node
const http = require('http');
const net = require('net');

function checkHttp(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}`, { timeout: 1500 }, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 400);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
  });
}

function canConnect(port, host = '127.0.0.1') {
  return new Promise((resolve) => {
    const s = net.createConnection({ port, host })
      .once('connect', () => { s.destroy(); resolve(true); })
      .once('error', () => { s.destroy(); resolve(false); });
  });
}

function canListen(port, host) {
  return new Promise((resolve) => {
    const srv = net.createServer()
      .once('error', () => resolve(false))
      .once('listening', () => srv.close(() => resolve(true)));
    srv.listen(host ? { port, host } : { port });
  });
}

async function isPortFree(port) {
  if (await canConnect(port, '127.0.0.1') || await canConnect(port, '::1')) return false;
  if (!(await canListen(port, '0.0.0.0'))) return false;
  if (!(await canListen(port))) return false;
  return true;
}

async function findAvailablePort(start = 3000, maxTries = 100) {
  for (let i = 0; i < maxTries; i++) {
    const p = start + i;
    if (await isPortFree(p)) return p;
  }
  return null;
}

(async () => {
  const isJson = process.argv.includes('--json');
  const freeOnly = process.argv.includes('--free-only');

  // If not forcing free-only, first check if dev server is already running and healthy
  if (!freeOnly) {
    for (let p = 3000; p <= 3010; p++) {
      if (await checkHttp(p)) {
        if (isJson) {
          console.log(JSON.stringify({ status: 'running', port: p, url: `http://localhost:${p}` }));
        } else {
          console.log(`RUNNING:${p}`);
        }
        return;
      }
    }
  }

  // Find first available free port starting at 3000
  const freePort = await findAvailablePort(3000, 100);
  if (!freePort) {
    console.error('No available ports found.');
    process.exit(1);
  }

  if (isJson) {
    console.log(JSON.stringify({ status: 'available', port: freePort, url: `http://localhost:${freePort}` }));
  } else {
    console.log(`AVAILABLE:${freePort}`);
  }
})();
