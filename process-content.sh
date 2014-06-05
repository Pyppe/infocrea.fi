#!/bin/bash

readonly PROGNAME=$(basename $0)
readonly PROGDIR=$(readlink -m $(dirname $0))
readonly ARGS="$@"
readonly TARGET="data"

cd $PROGDIR
rm -rf $TARGET
cp -ra content $TARGET
for file in $(find $TARGET -type f -name "*.jpg" -o -name "*.png" -o -name "*.gif"); do
  filename=$(basename $file)
  extension="${filename##*.}"
  filename="${filename%.*}"
  dir=`dirname $file`
  echo "Processing $file ..."
  convert -resize 300x180^ -gravity Center -crop 300x180+0+0 +repage $file $dir/${filename}.crop.$extension
  convert -resize "500x400>" $file $dir/${filename}.aside.$extension
  convert -resize "1200x800>" $file $dir/${filename}.large.$extension
done
