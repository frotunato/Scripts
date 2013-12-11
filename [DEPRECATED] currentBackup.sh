#!bin/bash
DIR="/home/fortuna/ramdisk"
CURRENT="/home/fortuna/storage/ramdisk"
CHECK_PID="$(pidof java)"
if [ "$CHECK_PID" ]; then
sudo rsync -ru --delete-delay  "$DIR/" "$CURRENT"
fi
