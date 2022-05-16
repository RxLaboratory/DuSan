# Duik Build tools

This folder contains some useful tools to quickly build (and release) DuSan and the DuSan API Documentation.

## Windows

Run `build-dusan.bat` to build DuSan in an `output` subfolder. Everything will be built there, and the API doc will be generated and also updated on the repo.

**Important note**: for this batch file to work and to be able to build DuSan, you need to have DuBuilder available and in the PATH environment variable of Windows. You also need to add the folder containing DuAEF in the settings of DuBuilder. [See the page about DuBuilder on rainboxlab.org](https://rxlaboratory.org/tools/dubuilder/).

**Importante note**: to generate the jsdoc of the API, you'll need [*better-docs*](https://github.com/SoftwareBrothers/better-docs), install it using `npm install --save-dev better-docs`.

## Mac OS

We still need to build a command file for Mac. Contributions are welcome!
