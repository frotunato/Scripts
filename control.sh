#!bin/bash
################ GENERAL VARIABLES ###################
USER="/home/fortuna/"
RAMDISK="/home/fortuna/ramdisk"
RAMDISK_MIRROR="/home/fortuna/storage/ramdisk"
BACKUP_PATH="/home/fortuna/storage/backup"
CHECK_PID="$(pidof java)"
DATE=$(date +"%d-%m-%Y [%T]")
NEWEST_BACKUP="$(ls "$BACKUP_PATH" -rt | tail -1)"
SESSION="MINECRAFT_SERVER"
######################################################

backup(){
if [ "$CHECK_PID" ]; then
local LOCAL_TIME_START="$(date +" [%H:%M:%S]")"
screen -S $SESSION -p 0 -X stuff "say $LOCAL_TIME_START Comenzando copia de seguridad..."`echo -ne '\015'`
screen -S $SESSION -p 0 -X stuff 'save-all'`echo -ne '\015'`
local START_TIME=`date +%s`
cd "$RAMDISK_MIRROR";tar cf "$BACKUP_PATH/$DATE.tar.lz4" --use-compress-prog=lz4 world world_nether world_the_end;cd "$HOME"
find "$BACKUP_PATH/" -mmin +240 -delete
local END_TIME=`date +%s`
let FINAL_TIME="$END_TIME"-"$START_TIME"
local LOCAL_TIME_END="$(date +" [%H:%M:%S]")"
screen -S $SESSION -p 0 -X stuff "say $LOCAL_TIME_END Copia de seguridad completada en $FINAL_TIME segundo(s)"`echo -ne '\015'`
fi
}

upload(){
local USERNAME="f0rtunato@hotmail.com"
local PASSWORD="encore"
local MEGA_DIR="/Root/backups"
if [ "$CHECK_PID" ]; then
local LOCAL_TIME_START="$(date +" [%H:%M:%S]")"
screen -S "$SESSION" -p 0 -X stuff "say $LOCAL_TIME_START Subiendo última copia de seguridad..."`echo -ne '\015'`
local START_TIME=`date +%s`
sudo megaput --no-progress "$BACKUP_PATH/$NEWEST_BACKUP" --path "$MEGA_DIR" -u "$USERNAME" -p "$PASSWORD"
local END_TIME=`date +%s`
let FINAL_TIME="$END_TIME"-"$START_TIME"
local LOCAL_TIME_END="$(date +" [%H:%M:%S]")"
screen -S "$SESSION" -p 0 -X stuff "say $LOCAL_TIME_END Copia de seguridad subida en $FINAL_TIME segundo(s)"`echo -ne '\015'`
fi
}

restore(){
if [ ! "$CHECK_PID" ]; then
cd "$RAMDISK"
sudo rm -r *
cd "$RAMDISK_MIRROR"
sudo rm -r *
cd "$USER";sudo lz4 -d "$BACKUP_PATH/$NEWEST_BACKUP"
local TAR="$(find $BACKUP_PATH -type f -name '*.tar' -print)"
sudo tar -xf "$TAR" -C "$RAMDISK_MIRROR/"
sudo rm -f "$TAR"
fi
}

sync(){
if [ "$CHECK_PID" ]; then
sudo rsync -ru --delete-delay  "$RAMDISK/" "$RAMDISK_MIRROR"
fi
}
