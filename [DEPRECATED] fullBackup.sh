#!/bin/bash
CURRENT_BACKUP_DIR="/home/fortuna/storage/ramdisk"
BACKUP_DIR="/home/fortuna/storage/backup"
DATE=$(date +"%d-%m-%Y-[%T]")
CHECK_PID="$(pidof java)"
if [ "$CHECK_PID" ]; then
sudo 7zr a "$BACKUP_DIR/"$DATE.7z "$CURRENT_BACKUP_DIR"
sudo find "$BACKUP_DIR" -mmin +240 -delete
fi
   
