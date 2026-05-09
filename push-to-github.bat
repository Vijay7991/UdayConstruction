@echo off
REM ---------------------------------------------------------------------------
REM One-shot push to GitHub for Uday Construction.
REM Run this from D:\Projects\Construction in cmd or PowerShell:
REM     cd D:\Projects\Construction
REM     push-to-github.bat
REM ---------------------------------------------------------------------------
setlocal

REM Remove any stale .git folder (it was partially created in an earlier session
REM and the cross-OS mount couldn't write a clean one). This is a fresh start.
if exist ".git" (
  echo Cleaning up partial .git folder...
  attrib -h -s -r .git /S /D
  rmdir /S /Q .git
)

echo.
echo === git init ===
git init -b main || goto :err

echo.
echo === git config (local) ===
git config user.email "vijayamni1502@gmail.com"
git config user.name  "Vijay Amni"

echo.
echo === git add . ===
git add .

echo.
echo === git commit ===
git commit -m "Initial commit: Uday Construction lead-gen site" || goto :err

echo.
echo === git remote add origin ===
git remote remove origin 2>nul
git remote add origin https://github.com/Vijay7991/UdayConstruction.git

echo.
echo === git push ===
echo If GitHub asks for credentials, use your username and a Personal Access Token
echo (not your password). Create one at:
echo     https://github.com/settings/tokens   (scope: repo)
echo.
git push -u origin main || goto :err

echo.
echo SUCCESS. View your repo at:
echo   https://github.com/Vijay7991/UdayConstruction
goto :eof

:err
echo.
echo *** Push failed. See the error above. ***
echo Common causes:
echo   - The repo on GitHub already has commits   ^=^> run: git pull --rebase origin main, then re-run this script
echo   - You signed in but the token lacks 'repo' scope   ^=^> generate a new token
echo   - You ran from the wrong folder   ^=^> cd D:\Projects\Construction first
exit /b 1
