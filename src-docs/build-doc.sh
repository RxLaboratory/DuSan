#!/bin/bash
mkdocs build
cd ..
cd docs
echo duik.rxlab.io > "CNAME"