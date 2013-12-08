#!bin/bash
BACKUP_DIR="/home/fortuna/storage/backup"
USERNAME="f0rtunato@hotmail.com"
PASSWORD="encore"
MEGA_DIR="/Root/backups"
CHECK_PID="$(pidof java)"
SESSION="MINECRAFT_SERVER"
NEWEST_BACKUP="$(ls "$BACKUP_DIR" -rt | tail -1)"
if [ "$CHECK_PID" ]; then
screen -S $SESSION -X stuff 'say Subiendo última copia de seguridad...'`echo -ne '\015'`
sudo megaput "$BACKUP_DIR/$NEWEST_BACKUP" --path "$MEGA_DIR" -u "$USERNAME" -p "$PASSWORD"
screen -S $SESSION -X stuff 'say Copia de seguridad subida'`echo -ne '\015'`
fi
