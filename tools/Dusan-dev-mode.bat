:: Edit these variables with the correct paths on your system
SET aeDir=C:\Program Files\Adobe\Adobe After Effects 2020\Support Files\Scripts\ScriptUI Panels
SET DuAEFRepo=..\..\DuAEF

:: Need admin to create symlinks
@echo off
if not "%1"=="am_admin" (powershell start -verb runas '%0' am_admin & exit /b)
:: Get back to original dir
pushd "%CD%"
CD /D "%~dp0"

:: Link Dusan
mklink "%aeDir%\DuSan.jsx" "..\src\DuSan.jsx"
:: Link Duik required
mklink /D "%aeDir%\dusan_required" "..\src\dusan_required"
:: Link DuAEF libs
mklink /D "%aeDir%\libs" "%DuAEFRepo%\src\libs"
:: Link DuAEF
mklink "%aeDir%\DuAEF.jsxinc" "%DuAEFRepo%\src\DuAEF.jsxinc"

:: Finished!
PAUSE