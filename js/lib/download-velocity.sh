#!/bin/bash

PROGDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
VER="0.11.2"
VELO="jquery.velocity.min.js"
VELOUI="velocity.ui.min.js"

cd $PROGDIR
rm $VELO
rm $VELOUI


wget http://cdn.jsdelivr.net/jquery.velocity/$VER/$VELO
wget http://cdn.jsdelivr.net/jquery.velocity/$VER/$VELOUI

