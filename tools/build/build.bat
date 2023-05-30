@echo off

:: The version ::
IF "%~1"=="" (
    SET version=2.0.5
) ELSE (
    SET version=%~1
)

:: The repo (current dir)
SET repoPath=%~dp0..\..

:: The build path
SET build_path=%~dp0output
:: The dist path to copy the result
SET dist_path="%repoPath%\dist"
:: The docs path
SET docs_path="%repoPath%\docs"
SET docsapi_path="%repoPath%\docs\reference"
:: The types path
SET types_path="%repoPath%\types\dusan"

echo Building DuSan version %version%...

:: Clean ::
echo __Cleaning

rd /s /q "%build_path%"
md "%build_path%"
rd /s /q "%dist_path%"
md "%dist_path%"
rd /s /q "%docs_path%"
md "%docs_path%"
rd /s /q "%types_path%"
md "%types_path%"

:: Build API ::
echo __Building API

mkdir "%build_path%\DuSan_API"
DuBuilder "%repoPath%\src\inc\api.jsxinc" --no-banner -r "{dusanVersion}:%version%" "%build_path%\DuSan_API\DuSan_api.jsxinc"
DuBuilder "%repoPath%\src\inc\api_all.jsxinc" --no-banner -r "{dusanVersion}:%version%" "%build_path%\DuSan_API\DuAEF_DuSan_api.jsxinc"
:: copy to dist
echo " " > "%dist_path%\DuSan_api.jsxinc"
echo " " > "%dist_path%\DuAEF_DuSan_api.jsxinc"
xcopy /Y "%build_path%\DuSan_API\DuSan_api.jsxinc" "%dist_path%\DuSan_api.jsxinc"
xcopy /Y "%build_path%\DuSan_API\DuAEF_DuSan_api.jsxinc" "%dist_path%\DuAEF_DuSan_api.jsxinc"

:: Build DuSan ::
echo __Building DuSan

mkdir "%build_path%\DuSan"
mkdir "%build_path%\DuSan\ScriptUI Panels"
DuBuilder "%repoPath%\src\DuSan.jsx" --no-banner -r "{dusanVersion}:%version%" "output\DuSan\ScriptUI Panels\DuSan.jsx"
echo " " > "%dist_path%\DuSan.jsxinc"
xcopy /Y "%build_path%\DuSan\ScriptUI Panels\DuSan.jsx" "%dist_path%\DuSan.jsxinc"

:: Build Doc ::
echo __Building DuSan docs

cd "%repoPath%\src-docs"
mkdocs build
cd %~dp0

:: Generate Reference ::
echo __Generating API reference

cmd /c jsdoc -c jsdoc_conf.json
echo " " > "%docsapi_path%\jsdoc.css"
xcopy /Y assets\jsdoc.css "%docsapi_path%\jsdoc.css"
xcopy /Y "%docsapi_path%\DuSanity.html" "%docsapi_path%\index.html"

:: Generate type defs ::
echo __Generating type defs
cmd /c jsdoc -c jsdoc_ts_conf.json
:: copy types to output
xcopy /S /I /Y "%types_path%\.." "%build_path%\DuSan_API\types"

:: Copy files where they need to be ::
echo __Finishing...

mkdir "%build_path%\DuSan\Tools"
echo " " > "%build_path%\DuSan\LICENSE.md"
echo " " > "%build_path%\DuSan\LICENSE.txt"
echo " " > "%build_path%\DuSan_API\LICENSE.txt"
echo " " > "%build_path%\DuSan\README.txt"
echo " " > "%build_path%\DuSan\Tools\DuSI.jsx"
xcopy /Y "assets\LICENSE.md" "%build_path%\DuSan\LICENSE.md"
xcopy /Y "assets\LICENSE.txt" "%build_path%\DuSan\LICENSE.txt"
xcopy /Y "assets\LICENSE.txt" "%build_path%\DuSan_API\LICENSE.txt"
xcopy /Y "assets\README.txt" "%build_path%\DuSan\README.txt"
xcopy /Y "assets\DuSI.jsx" "%build_path%\DuSan\Tools\DuSI.jsx"
xcopy /S /I /Y "%docsapi_path%" "%build_path%\DuSan_API\docs"
