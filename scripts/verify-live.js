const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Connected to VPS for live verification');
  const cmd = `
    echo "========================================="
    echo "1. VPS SYSTEM HEALTH & STATUS"
    echo "========================================="
    echo "--- Uptime & Load ---"
    uptime
    echo "--- Memory ---"
    free -h
    echo "--- Disk Space ---"
    df -h / /srv/papaya-media
    echo "--- Nginx Service ---"
    systemctl is-active nginx
    echo "--- PM2 Status ---"
    su - papaya -c "pm2 status"

    echo "========================================="
    echo "2. FOLDER STRUCTURE OF /srv/papaya-media"
    echo "========================================="
    tree -h -I "uploads|cms-media" /srv/papaya-media
    echo ""
    echo "--- Uploads & CMS Media Summary ---"
    echo "cms-media files: $(ls /srv/papaya-media/cms-media 2>/dev/null | wc -l)"
    echo "uploads files: $(ls /srv/papaya-media/uploads 2>/dev/null | wc -l)"

    echo "========================================="
    echo "3. DIRECT MEDIA ENDPOINT AUDIT (HTTP 200 via Nginx)"
    echo "========================================="
    MEDIA_FILES=(
      "/media/videos/about-hero.mp4"
      "/media/hero/hero-beach.jpg"
      "/media/curated/sempre.jpg"
      "/media/curated/casa-sukriti.jpg"
      "/media/curated/the-fieldhouse.jpg"
      "/media/curated/la-amore.jpg"
      "/media/leisure/more-than-a-stay.jpg"
      "/media/leisure/go-beyond-guidebooks.jpg"
      "/media/leisure/a-little-extra.jpg"
      "/media/destinations/candolim.jpg"
      "/media/destinations/siolim.jpg"
      "/media/destinations/reis-magos.jpg"
      "/media/stays/stays-hero.jpg"
      "/media/partner/partner-hero.jpg"
      "/media/partner/host-care.jpg"
      "/media/about/about-curated-home.jpg"
      "/media/about/shikha.jpg"
    )

    for path in "\${MEDIA_FILES[@]}"; do
      url="http://187.127.187.184\${path}"
      code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
      type=$(curl -sI "$url" | grep -i "content-type" | tr -d '\\r')
      size=$(curl -sI "$url" | grep -i "content-length" | tr -d '\\r')
      cache=$(curl -sI "$url" | grep -i "cache-control" | tr -d '\\r')
      echo "[$code] $path | $size | $type | $cache"
    done

    echo "========================================="
    echo "4. LIVE WEBSITE PAGE AUDIT & HTML CHECKS"
    echo "========================================="
    for page in "/" "/about" "/stays" "/partner-with-us"; do
      url="http://187.127.187.184\${page}"
      code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
      media_count=$(curl -s "$url" | grep -o '/media/[^"'"'"']\\+' | sort -u | wc -l)
      echo "[$code] $url (Contains $media_count unique /media/ references in HTML)"
    done

    echo "--- Sample Media Links in Live HTML ---"
    curl -s "http://187.127.187.184/about" | grep -o '/media/[^"'"'"']\\+' | sort -u
    curl -s "http://187.127.187.184/partner-with-us" | grep -o '/media/[^"'"'"']\\+' | sort -u

    echo "========================================="
    echo "5. DOMAIN COMING SOON CHECK"
    echo "========================================="
    curl -sI -k https://pinkpapayastays.com | head -n 5
  `;

  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      conn.end();
    }).on('data', d => process.stdout.write(d))
      .stderr.on('data', d => process.stderr.write(d));
  });
}).on('error', err => {
  console.error('SSH Error:', err);
}).connect({
  host: '187.127.187.184',
  port: 22,
  username: 'root',
  password: 'P+,1fLHpL22/A9+;'
});
