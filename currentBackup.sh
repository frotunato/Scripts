#!bin/bash
DIR="/home/fortuna/ramdisk"
CURRENT="/home/fortuna/storage/current"
CHECK_EMPTY="$(ls -A $DIR)"
CHECK_PID="$(pidof java)"
if [ "$CHECK_PID" ]; then
sudo rsync -ru "$DIR/" "$CURRENT"
fi

