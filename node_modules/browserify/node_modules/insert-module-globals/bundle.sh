#!/bin/bash

browserify -r buffer-browserify > buffer.js
echo ';module.exports=require("buffer-browserify")' >> buffer.js
