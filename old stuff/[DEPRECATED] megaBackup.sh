#!bin/bash
BACKUP_DIR="/home/fortuna/storage/backup"
USERNAME="******"
PASSWORD="******"
MEGA_DIR="/Root/backups"
CHECK_PID="$(pidof java)"
SESSION="MINECRAFT_SERVER"
NEWEST_BACKUP="$(ls "$BACKUP_DIR" -rt | tail -1)"
if [ "$CHECK_PID" ]; then
sleep 10
FIRST_TIME="$(date +" [%H:%M:%S]")"
screen -S $SESSION -p 0 -X stuff "say $FIRST_TIME Subiendo última copia de seguridad..."`echo -ne '\015'`
START_TIME=`date +%s`
sudo megaput --no-progress "$BACKUP_DIR/$NEWEST_BACKUP" --path "$MEGA_DIR" -u "$USERNAME" -p "$PASSWORD"
END_TIME=`date +%s`
let FINAL_TIME=$END_TIME-$START_TIME
LAST_TIME="$(date +" [%H:%M:%S]")"
screen -S $SESSION -p 0 -X stuff "say $LAST_TIME Copia de seguridad subida en $FINAL_TIME segundo(s)"`echo -ne '\015'`
fi
