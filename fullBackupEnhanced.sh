#!bin/bash
CURRENT_BACKUP_DIR="/home/fortuna/storage/current/"
BACKUP_DIR="/home/fortuna/storage/backup/"
DATE="$(date +"%d-%m-%Y")"
TIME="$(date +" [%H;%M;%S]")"
CHECK_PID="$(pidof java)"
SESSION="MINECRAFT_SERVER"
if [ "$CHECK_PID" ]; then
screen -S $SESSION -p 0 -X stuff 'say Comenzando copia de seguridad...'`echo -ne '\015'`
START_TIME=`date +%s`
cd /home/fortuna/storage
tar cf "$BACKUP_DIR$DATE$TIME.tar.lz4" --use-compress-prog=lz4 "./current"
find "$BACKUP_DIR" -mmin +240 -delete
END_TIME=`date +%s`
let FINAL_TIME=$END_TIME-$START_TIME
screen -S $SESSION -p 0 -X stuff "say Copia de seguridad completada en $FINAL_TIME segundo(s)"`echo -ne '\015'`
fi
