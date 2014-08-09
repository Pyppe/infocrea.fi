#!/bin/bash

readonly PROGNAME=$(basename $0)
readonly PROGDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
readonly ARGS="$@"
readonly TARGET="$PROGDIR/_site"
readonly JEKYLL=`which jekyll`
readonly ENV_SRC="$PROGDIR/environment.sh"

function promptYesNo() {
  read -p "$1 [yes/no]:"
  echo ""
}

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

promptYesNo "Synchronize from Github?"
if [ "$REPLY" == "yes" ]; then
  git pull --rebase
  gitExitCode=$?
  if [[ $gitExitCode != 0 ]]; then
    exit $gitExitCode
  fi
fi

shopt -s globstar
rm -rf $TARGET
./process-content.sh
$JEKYLL build
rm -rf $TARGET/content
rm -f $TARGET/*.sh
rm -f $TARGET/*.iml
rm -rf $TARGET/sass
rm -rf $TARGET/node_modules

rsync -hrvz --checksum --stats $TARGET/ $SSH_HOST:$SSH_DIR/

