const fs = require('fs');
const path = require('path');
const { Client } = require('ssh2');

const conn = new Client();

conn.on('ready', () => {
  console.log('Connected to VPS via SSH');
  
  // List env files and print content of /var/www/pink-papaya/.env
  const script = `
    echo "=== FILES IN /var/www/pink-papaya matching .env* ==="
    ls -la /var/www/pink-papaya/.env* 2>/dev/null || echo "None found with ls"
    echo "=== CONTENT OF /var/www/pink-papaya/.env ==="
    if [ -f /var/www/pink-papaya/.env ]; then
      cat /var/www/pink-papaya/.env
    else
      echo "FILE_NOT_FOUND"
    fi
    echo "=== END OF .env ==="
  `;

  let output = '';
  let errOutput = '';

  conn.exec(script, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code) => {
      conn.end();
      if (code !== 0) {
        console.error('Command exited with code ' + code + ': ' + errOutput);
        process.exit(code);
      }
      
      const startTag = '=== CONTENT OF /var/www/pink-papaya/.env ===\n';
      const endTag = '\n=== END OF .env ===';
      const startIndex = output.indexOf(startTag);
      const endIndex = output.indexOf(endTag);
      
      if (startIndex !== -1 && endIndex !== -1) {
        const envContent = output.substring(startIndex + startTag.length, endIndex).trim();
        if (envContent && envContent !== 'FILE_NOT_FOUND') {
          const rootEnv = path.join(__dirname, '..', '..', '.env');
          const rootEnvLocal = path.join(__dirname, '..', '..', '.env.local');
          fs.writeFileSync(rootEnv, envContent + '\n', 'utf8');
          fs.writeFileSync(rootEnvLocal, envContent + '\n', 'utf8');
          console.log('Successfully written to .env and .env.local');
        } else {
          console.log('No valid content found in remote .env');
        }
      } else {
        console.log('Could not find delimiter tags in output.');
      }
    }).on('data', (data) => {
      output += data.toString();
      process.stdout.write(data);
    }).stderr.on('data', (data) => {
      errOutput += data.toString();
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
