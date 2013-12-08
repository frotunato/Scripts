#!bin/bash
BACKUP_DIR="/home/fortuna/storage/backup"
NEWEST_BACKUP="$(ls "$BACKUP_DIR" -rt | tail -1)"
CHECK_PID="$(pidof java)"
DIR="/home/fortuna/ramdisk"
if [ ! "$CHECK_PID" ]; then
sudo rm -rf /home/fortuna/ramdisk/* 
sudo rm -rf /home/fortuna/storage/current/*
sudo mkdir "$DIR/world"
sudo mkdir "$DIR/world_nether"
sudo mkdir "$DIR/world_the_end"
sudo lz4 -d "$BACKUP_DIR/$NEWEST_BACKUP"
TAR="$(find $BACKUP_DIR -type f -name '*.tar' -print)"
sudo tar -xf "$TAR" ramdisk
sudo rm -f "$TAR"
fi
