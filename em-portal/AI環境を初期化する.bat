@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"

echo Initialize Obsidian AI workspace...
powershell.exe -ExecutionPolicy Bypass -File "%~dp0ops\Setup-ObsidianAIWorkspace.ps1"
set EXIT_CODE=%ERRORLEVEL%

echo.
if %EXIT_CODE% EQU 0 (
  echo Completed.
) else (
  echo Failed. Check the error message above.
)
pause
exit /b %EXIT_CODE%

