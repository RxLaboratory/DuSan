@echo off
cd ..
cd ..
cd src-docs
mkdocs build
cd ..
cd docs
echo dusan.rxlab.guide > "CNAME"
cd ..
cd tools
cd "build-tools"
mkdir output
mkdir "output\DuSan"
mkdir "output\DuSan_API"
mkdir "output\DuSan_API\docs"
mkdir "output\DuSan\ScriptUI Panels"
mkdir "output\DuSan\Help"
mkdir "output\DuSan\Tools"
DuBuilder ..\..\inc\api.jsxinc -nobanner output\DuSan_API\DuSan_api.jsxinc
DuBuilder ..\..\inc\api_all.jsxinc -nobanner output\DuSan_API\DuAEF_DuSan_api.jsxinc
DuBuilder "..\..\DuSan.jsx" -nobanner "output\DuSan\ScriptUI Panels\DuSan.jsx"
echo " " > "output\DuSan\LICENSE.md"
echo " " > "output\DuSan\LICENSE.txt"
echo " " > "output\DuSan_API\LICENSE.txt"
echo " " > "output\DuSan\README.txt"
xcopy /Y items\LICENSE.md "output\DuSan\LICENSE.md"
xcopy /Y items\LICENSE.txt "output\DuSan\LICENSE.txt"
xcopy /Y items\LICENSE.txt "output\DuSan_API\LICENSE.txt"
xcopy /Y items\README.txt "output\DuSan\README.txt"
cd jsdoc
cmd /c build-jsdoc.bat
cd ..
cd ..
cd ..
cd docs
echo " " > 404.md
xcopy /Y "..\tools\build-tools\items\404.md" 404.md
cd ..
xcopy /S /I /Y docs\reference tools\build-tools\output\DuSan_API\docs
xcopy /S /I /Y docs\ tools\build-tools\output\DuSan\Help
del tools\build-tools\output\DuSan\Help\CNAME
del tools\build-tools\output\DuSan\Help\404.md
pause