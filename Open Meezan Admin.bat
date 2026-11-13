@echo off
title Meezan admin
cd /d "%~dp0"
echo.
echo  Meezan admin
echo  ------------
if not exist ".env.local" (
  echo  This computer is not set up for the admin: the .env.local file is missing.
  echo  See docs\ADMIN.md
  pause
  exit /b 1
)
echo  Getting the latest version of the website...
git pull --ff-only
if not exist "node_modules" (
  echo  Installing, first time only. This takes a few minutes...
  call npm install
)
echo.
echo  The admin opens in your browser at http://localhost:5173/admin
echo  Keep this window open while you work. Close it to stop the admin.
echo.
call npm run admin
