#!/bin/bash

readonly PROGNAME=$(basename $0)
readonly PROGDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
readonly ARGS="$@"
readonly TARGET="$PROGDIR/_site"
readonly JEKYLL=`which jekyll`
readonly ENV_SRC="$PROGDIR/environment.sh"

if [ ! -f $JEKYLL ]; then
  echo "Jekyll not found. Exiting..."
  exit 1
fi

if [ ! -f $ENV_SRC ]; then
  echo "$(basename $ENV_SRC) not found. Exiting..."
  exit 1
fi
. $ENV_SRC

cd $PROGDIR

shopt -s globstar
rm -rf $TARGET
./process-content.sh
$JEKYLL build
rm -rf $TARGET/content
rm -f $TARGET/*.sh
rm -f $TARGET/*.iml
rm -rf $TARGET/sass

rsync -hrvz --checksum --stats $TARGET/ $SSH_HOST:$SSH_DIR/

