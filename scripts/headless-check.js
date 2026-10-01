const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BROWSER_PATH = fs.existsSync(CHROME_PATH) ? CHROME_PATH : EDGE_PATH;

const outputDir = path.join(__dirname, "..", "scratch", "screenshots");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const VIEWPORTS = [
  { name: "13_inch_laptop_1280x800", width: 1280, height: 800, label: '13" Laptop (1280x800)' },
  { name: "15_inch_laptop_1440x900", width: 1440, height: 900, label: '15" Laptop (1440x900)' },
  { name: "1080p_desktop_1920x1080", width: 1920, height: 1080, label: '24" 1080p Monitor (1920x1080)' },
  { name: "2K_monitor_2560x1440", width: 2560, height: 1440, label: '27" 2K Monitor (2560x1440)' },
  { name: "32_ultrawide_3440x1440", width: 3440, height: 1440, label: '32" Ultra-wide Monitor (3440x1440)' },
  { name: "32_4K_monitor_3840x2160", width: 3840, height: 2160, label: '32" 4K Monitor (3840x2160)' },
];

function captureScreenshot(vp) {
  return new Promise((resolve) => {
    const screenshotPath = path.join(outputDir, `${vp.name}.png`);
    const args = [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      `--window-size=${vp.width},${vp.height}`,
      `--screenshot=${screenshotPath}`,
      "--virtual-time-budget=5000",
      "http://localhost:3000",
    ];

    const proc = spawn(BROWSER_PATH, args);
    proc.on("close", (code) => {
      if (fs.existsSync(screenshotPath)) {
        console.log(`[SUCCESS] ${vp.label} screenshot saved (${fs.statSync(screenshotPath).size} bytes)`);
        resolve({ ...vp, success: true, screenshotPath });
      } else {
        console.error(`[FAILED] ${vp.label} (code ${code})`);
        resolve({ ...vp, success: false });
      }
    });
    proc.on("error", (err) => {
      console.error(`[ERROR] ${vp.label}: ${err.message}`);
      resolve({ ...vp, success: false });
    });
  });
}

(async () => {
  console.log(`Starting Headless Screen Audit across 6 screen sizes (13" to 32")...\nUsing Browser: ${BROWSER_PATH}\n`);
  const results = [];
  for (const vp of VIEWPORTS) {
    const res = await captureScreenshot(vp);
    results.push(res);
  }
  console.log("\nHeadless audit complete.");
})();
