#!bin/bash
BACKUP_DIR="/home/fortuna/storage/backup"
USERNAME="***************"
PASSWORD="***************"
MEGA_DIR="/Root/backups"
CHECK_PID="$(pidof java)"
SESSION="MINECRAFT_SERVER"
NEWEST_BACKUP="$(ls "$BACKUP_DIR" -rt | tail -1)"
if [ "$CHECK_PID" ]; then
screen -S $SESSION -p 0 -X stuff 'say Subiendo última copia de seguridad...'`echo -ne '\015'`
START_TIME=`date +%s`
sudo megaput "$BACKUP_DIR/$NEWEST_BACKUP" --path "$MEGA_DIR" -u "$USERNAME" -p "$PASSWORD"
END_TIME=`date +%s`
let FINAL_TIME=$END_TIME-$START_TIME
screen -S $SESSION -p 0 -X stuff "say Copia de seguridad subida en $FINAL_TIME segundo(s)"`echo -ne '\015'`
fi
