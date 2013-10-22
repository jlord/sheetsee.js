#!/bin/bash
TAG=$1

if [ -z $TAG ]; then
    echo "Usage: deploy.sh <tag>"
    exit;
fi

existing=`s3cmd ls s3://mapbox-js/mapbox.js/$TAG/`

if [ "$existing" != "" ]; then
    echo "will not overwrite $TAG"
    echo "has content"
    echo "$existing"
    exit;
fi

echo "--- DEPLOYING mapbox.js $TAG ---"
echo ""
echo ""

s3cmd put --acl-public --mime-type "application/javascript" dist/mapbox.js s3://mapbox-js/mapbox.js/$TAG/mapbox.js
s3cmd put --acl-public --mime-type "application/javascript" dist/mapbox.uncompressed.js s3://mapbox-js/mapbox.js/$TAG/mapbox.uncompressed.js
s3cmd put --acl-public --mime-type "application/javascript" dist/mapbox.standalone.js s3://mapbox-js/mapbox.js/$TAG/mapbox.standalone.js
s3cmd put --acl-public --mime-type "application/javascript" dist/mapbox.standalone.uncompressed.js s3://mapbox-js/mapbox.js/$TAG/mapbox.standalone.uncompressed.js
s3cmd put --acl-public --mime-type "text/css" dist/mapbox.css s3://mapbox-js/mapbox.js/$TAG/mapbox.css
s3cmd put --acl-public --mime-type "text/css" dist/mapbox.ie.css s3://mapbox-js/mapbox.js/$TAG/mapbox.ie.css
s3cmd put --acl-public --mime-type "text/css" dist/mapbox.standalone.css s3://mapbox-js/mapbox.js/$TAG/mapbox.standalone.css
s3cmd put --acl-public --mime-type "image/png" dist/images/layers.png s3://mapbox-js/mapbox.js/$TAG/images/layers.png
s3cmd put --acl-public --mime-type "image/png" dist/images/marker-icon.png s3://mapbox-js/mapbox.js/$TAG/images/marker-icon.png
s3cmd put --acl-public --mime-type "image/png" dist/images/marker-icon-2x.png s3://mapbox-js/mapbox.js/$TAG/images/marker-icon-2x.png
s3cmd put --acl-public --mime-type "image/png" dist/images/marker-shadow.png s3://mapbox-js/mapbox.js/$TAG/images/marker-shadow.png

echo ""
echo ""
echo "--- DEPLOYED mapbox.js $TAG ! ---"
