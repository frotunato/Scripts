#!bin/bash
RAMDISK="/home/fortuna/ramdisk"
BACKUP_DIR="/home/fortuna/storage/backup"
CURRENT_BACKUP="/home/fortuna/storage/ramdisk"
NEWEST_BACKUP="$(ls "$BACKUP_DIR" -rt | tail -1)"
CHECK_PID="$(pidof java)"
DIR="/home/fortuna/ramdisk"
if [ ! "$CHECK_PID" ]; then
cd $RAMDISK
sudo rm -r *
cd $CURRENT_BACKUP
sudo rm -r *
sudo lz4 -d "$BACKUP_DIR/$NEWEST_BACKUP"
TAR="$(find $BACKUP_DIR -type f -name '*.tar' -print)"
sudo tar -xf "$TAR" -C "$CURRENT_BACKUP/"
sudo rm -f "$TAR"
fi
