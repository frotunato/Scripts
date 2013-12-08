#!bin/bash
DIR="ramdisk/"
BACKUP_DIR="/home/fortuna/storage/backup/"
DATE="$(date +"%d-%m-%Y")"
TIME="$(date +" [%H;%M;%S]")"
CHECK_PID="$(pidof java)"
SESSION="MINECRAFT_SERVER"
if [ "$CHECK_PID" ]; then
screen -S $SESSION -X stuff 'say Comenzando copia de seguridad...'`echo -ne '\015'`
tar cf "$BACKUP_DIR$DATE$TIME.tar.lz4" --use-compress-prog=lz4 "$DIR"
find "$BACKUP_DIR" -mmin +240 -delete
screen -S $SESSION -X stuff 'say Copia de seguridad completada'`echo -ne '\015'`
fi
