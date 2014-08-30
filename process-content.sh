#!/bin/bash

readonly PROGNAME=$(basename $0)
readonly PROGDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
readonly ARGS="$@"
readonly TARGET="data"

cd $PROGDIR
rm -rf $TARGET
cp -Ra content $TARGET
for file in $(find $TARGET -type f -name "*.jpg" -o -name "*.png" -o -name "*.gif"); do
  filename=$(basename $file)
  extension="${filename##*.}"
  filename="${filename%.*}"
  dir=`dirname $file`
  echo "Processing $file ..."
  convert -resize 300x180^ -gravity Center -crop 300x180+0+0 +repage $file $dir/${filename}.crop.$extension
  convert -resize "600x480>" $file $dir/${filename}.medium.$extension
  convert -resize "1200x800>" $file $dir/${filename}.large.$extension
done
