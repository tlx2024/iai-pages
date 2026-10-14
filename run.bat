@echo off
rem IAI Pages - local development launcher
rem Interactive options:
rem   [1] Pages Dev Mode   - Astro dev server (base=/iai-pages, http://localhost:4321/iai-pages/)
rem   [2] WWW Review Dev   - Astro dev server (base=/, port 4322, linked to cloud 8450)
rem   [3] Build Pages      - Build static site for GitHub Pages (dist/pages/)
rem   [4] Build WWW Review - Build static site for WWW review (dist/www/)
rem   [5] Preview Built    - Run Astro preview on built static output
rem   [6] Test & Check     - Run site target tests and astro check
rem   [7] Reinstall Deps   - Run npm ci in site directory
rem   [Q] Quit
rem NOTE: keep this file ASCII-only; cmd.exe parses batch files using the system codepage.
setlocal EnableDelayedExpansion
cd /d "%~dp0"

echo.
echo ============================================
echo   IAI Pages - choose launch mode
echo ============================================
echo   [1] Pages Dev Mode   (base=/iai-pages, http://localhost:4321/iai-pages/)
echo   [2] WWW Review Dev   (base=/, port 4322, linked to cloud :8450)
echo   [3] Build Pages      (npm run build:pages -^> dist/pages/)
echo   [4] Build WWW Review (npm run build:www -^> dist/www/)
echo   [5] Preview Built    (npm run preview)
echo   [6] Test ^& Check     (npm test and astro check)
echo   [7] Reinstall Deps   (npm ci in site/)
echo   [Q] Quit
echo ============================================
set /p MODE="Enter 1/2/3/4/5/6/7/Q, Enter=1: "
if "!MODE!"=="" set MODE=1
for /f "tokens=1" %%A in ("!MODE!") do set MODE=%%A

if /i "!MODE!"=="Q" exit /b 0
if "!MODE!"=="1" goto dev_pages
if "!MODE!"=="2" goto dev_www
if "!MODE!"=="3" goto build_pages
if "!MODE!"=="4" goto build_www
if "!MODE!"=="5" goto preview_built
if "!MODE!"=="6" goto test_check
if "!MODE!"=="7" goto reinstall_deps
echo [ERROR] invalid choice: !MODE! & pause & exit /b 1

rem ----------------------------------------------------------------------
rem Common precheck
rem ----------------------------------------------------------------------
:check_tools
where node >nul 2>nul || (echo [ERROR] node not found. Please install Node.js 22+ first. & pause & exit /b 1)
where npm >nul 2>nul || (echo [ERROR] npm not found. Please install Node.js 22+ first. & pause & exit /b 1)
if not exist "site\node_modules" (
  echo [SETUP] node_modules not found, installing dependencies in site/...
  pushd site
  call npm ci || call npm install || (popd & pause & exit /b 1)
  popd
)
goto :eof

rem ----------------------------------------------------------------------
rem [1] Pages Dev Mode
rem ----------------------------------------------------------------------
:dev_pages
call :check_tools
echo [CLEAN] freeing port 4321 if held by stale processes...
powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 4321 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"

echo.
echo [START] Astro dev server in Pages mode
echo   - URL: http://localhost:4321/iai-pages/
echo.
cd /d "%~dp0site"
call npm run dev -- --port 4321
endlocal
exit /b 0

rem ----------------------------------------------------------------------
rem [2] WWW Review Dev
rem ----------------------------------------------------------------------
:dev_www
call :check_tools
echo [CLEAN] freeing port 4322 if held by stale processes...
powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 4322 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"

echo.
echo [START] Astro dev server in WWW review mode
echo   - URL:                  http://localhost:4322/
echo   - Account preview link: http://127.0.0.1:8450
echo.
cd /d "%~dp0site"
set SITE_MODE=www
set SITE_PREVIEW=true
set WWW_ORIGIN=https://www.iai.example
set SITE_ACCOUNT_PREVIEW_ORIGIN=http://127.0.0.1:8450
call npm run dev -- --port 4322
endlocal
exit /b 0

rem ----------------------------------------------------------------------
rem [3] Build Pages
rem ----------------------------------------------------------------------
:build_pages
call :check_tools
echo.
echo [BUILD] Building GitHub Pages artifact (dist/pages/)...
cd /d "%~dp0site"
call npm run build:pages
if !ERRORLEVEL! NEQ 0 (echo [ERROR] Pages build failed. & pause & exit /b 1)
echo.
echo [DONE] Build complete. Output: site\dist\pages
pause
endlocal
exit /b 0

rem ----------------------------------------------------------------------
rem [4] Build WWW Review
rem ----------------------------------------------------------------------
:build_www
call :check_tools
echo.
echo [BUILD] Building WWW review artifact (dist/www/)...
cd /d "%~dp0site"
set SITE_MODE=www
set SITE_PREVIEW=true
set WWW_ORIGIN=https://www.iai.example
set SITE_ACCOUNT_PREVIEW_ORIGIN=http://127.0.0.1:8450
call npm run build:www
if !ERRORLEVEL! NEQ 0 (echo [ERROR] WWW build failed. & pause & exit /b 1)
echo.
echo [DONE] Build complete. Output: site\dist\www
pause
endlocal
exit /b 0

rem ----------------------------------------------------------------------
rem [5] Preview Built Site
rem ----------------------------------------------------------------------
:preview_built
call :check_tools
echo.
echo [PREVIEW] Starting Astro preview server...
cd /d "%~dp0site"
call npm run preview
endlocal
exit /b 0

rem ----------------------------------------------------------------------
rem [6] Test and Check
rem ----------------------------------------------------------------------
:test_check
call :check_tools
echo.
echo [TEST] Running node --test scripts/test-site-target.mjs...
cd /d "%~dp0site"
call npm test
if !ERRORLEVEL! NEQ 0 (echo [WARN] Tests reported failures.)
echo.
echo [CHECK] Running astro check...
call npm run check
if !ERRORLEVEL! NEQ 0 (echo [WARN] Astro check reported issues.)
echo.
pause
endlocal
exit /b 0

rem ----------------------------------------------------------------------
rem [7] Reinstall Dependencies
rem ----------------------------------------------------------------------
:reinstall_deps
where npm >nul 2>nul || (echo [ERROR] npm not found & pause & exit /b 1)
echo [SETUP] installing dependencies in site/ using npm ci...
cd /d "%~dp0site"
call npm ci
echo.
echo [DONE] dependencies installed.
pause
endlocal
exit /b 0
