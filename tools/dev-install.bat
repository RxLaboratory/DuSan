@echo off

:: Edit these variables with the correct paths on your system
SET aeDir=C:\Program Files\Adobe\Adobe After Effects 2022\Support Files\Scripts\ScriptUI Panels
:: The repo is the current dir by default
SET repoPath=%~dp0..

:: Need admin to create symlinks
@echo off
if not "%1"=="am_admin" (powershell start -verb runas '%0' am_admin & exit /b)
:: Get back to original dir
pushd "%CD%"
CD /D "%~dp0"

echo Installing "%repoPath%" in "%aeDir%"...

REM (Trying to) remove older files
del "%aeDir%\DuSan.jsx"
rd /s /q "%aeDir%\inc"
rd /s /q "%aeDir%\DuAEF"

REM link the main files
mklink "%aeDir%\DuSan.jsx" "%repoPath%\DuSan.jsx"
echo Linked main files

mklink /D "%aeDir%\inc" "%repoPath%\inc"
echo Linked included files in 'inc\'

REM link dependencies
mklink /D "%aeDir%\DuAEF" "%repoPath%\DuAEF"
echo Linked DuAEF

:: Finished!
PAUSE