#!/usr/bin/env node
/**
 * Pink Papaya VPS Deployment Script
 * Attempts to use ssh2 if present, or delegates directly to python3 scripts/vps-deploy.py
 */

let Client;
try {
  Client = require('ssh2').Client;
} catch (e) {
  // If ssh2 is not installed, fallback to the robust Python deployment runner
  const { spawn } = require('child_process');
  const path = require('path');
  const pyScript = path.join(__dirname, 'vps-deploy.py');
  const child = spawn('python3', [pyScript, ...process.argv.slice(2)], { stdio: 'inherit' });
  child.on('close', (code) => process.exit(code || 0));
  child.on('error', (err) => {
    console.error('Failed to run python3 scripts/vps-deploy.py:', err);
    process.exit(1);
  });
  return;
}

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: Connected to VPS');
  const commands = `su - papaya -c "cd /var/www/pink-papaya && git fetch origin && git reset --hard origin/main && npm install && npm run build && pm2 restart all && sleep 2 && pm2 list && curl -sI http://localhost:3000"`;
  
  conn.exec(commands, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code) => {
      console.log('Stream :: closed with code: ' + code);
      conn.end();
      if (code !== 0) process.exit(code);
    }).on('data', (data) => {
      process.stdout.write(data);
    }).stderr.on('data', (data) => {
      process.stderr.write(data);
    });
  });
}).on('error', (err) => {
  console.error('Connection error:', err);
  process.exit(1);
}).connect({
  host: '187.127.187.184',
  port: 22,
  username: 'root',
  password: 'P+,1fLHpL22/A9+;'
});
