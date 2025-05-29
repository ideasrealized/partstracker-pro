@echo off
echo 🔍 Starting PartsTracker-Pro V2.0 Monitoring Dashboard...
echo.
cd /d "%~dp0.."
node scripts/monitor_site.js
pause 