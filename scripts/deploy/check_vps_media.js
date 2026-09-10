const { execSync } = require('child_process');
const sshScript = 'C:\\Users\\marsh\\.gemini\\antigravity-ide\\brain\\0c16d623-1655-4866-8347-89711b6c8257\\scratch\\ssh.js';

try {
  const out = execSync(`node "${sshScript}" "ls /srv/papaya-media/uploads"`).toString();
  const lines = out.trim().split('\n');
  console.log('Total uploaded files on VPS:', lines.length);
  console.log('Sample files:', lines.slice(0, 10));
} catch (e) {
  console.error('Error:', e.message);
}
