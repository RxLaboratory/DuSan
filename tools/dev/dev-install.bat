@echo off

:: Edit these variables with the correct paths on your system
SET aeVersion=2023
SET "aeDir=C:\Program Files\Adobe\Adobe After Effects %aeVersion%\Support Files\Scripts\ScriptUI Panels"
:: The repo is the current dir by default
SET repoPath=%~dp0..\..

:: Need admin to create symlinks
@echo off
if not "%1"=="am_admin" (powershell start -verb runas '%0' am_admin & exit /b)
:: Get back to original dir
pushd "%CD%"
CD /D "%~dp0"

echo Installing "%repoPath%" in "%aeDir%"...

:: (Trying to) remove older files
del "%aeDir%\DuSan.jsx"
rd /s /q "%aeDir%\inc"

:: link the main files
mklink "%aeDir%\DuSan.jsx" "%repoPath%\src\DuSan.jsx"
echo Linked main files

mklink /D "%aeDir%\inc" "%repoPath%\src\inc"
echo Linked included files in 'inc\'

pause