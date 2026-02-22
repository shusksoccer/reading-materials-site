@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"

set /p NOTE_TITLE=Title: 
if "%NOTE_TITLE%"=="" (
  echo Title is required.
  pause
  exit /b 1
)

set /p NOTE_KIND=Kind [library/glossary/people/faq/figures/lessons/worksheets] (default: library): 
if "%NOTE_KIND%"=="" set NOTE_KIND=library

powershell.exe -ExecutionPolicy Bypass -File "%~dp0ops\New-ObsidianResearchNote.ps1" -Title "%NOTE_TITLE%" -Kind "%NOTE_KIND%"
set EXIT_CODE=%ERRORLEVEL%

echo.
if %EXIT_CODE% EQU 0 (
  echo Note created.
) else (
  echo Failed. Check the error message above.
)
pause
exit /b %EXIT_CODE%

