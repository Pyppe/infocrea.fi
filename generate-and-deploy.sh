#!/bin/bash

readonly PROGNAME=$(basename $0)
readonly PROGDIR=$(readlink -m $(dirname $0))
readonly ARGS="$@"
readonly TARGET="$PROGDIR/_site"
readonly JEKYLL=`which jekyll`

if [ ! -f $JEKYLL ]; then
  echo "Jekyll not found. Exiting..."
  exit 1
fi

cd $PROGDIR
. $PROGDIR/environment.sh

shopt -s globstar
rm -rf $TARGET
#./process-content.sh
$JEKYLL build
rm -rf $TARGET/content
rm -f $TARGET/*.sh
rm -f $TARGET/*.iml
rm -rf $TARGET/sass

rsync -hrvz --checksum --stats $TARGET/ $SSH_HOST:$SSH_DIR/

