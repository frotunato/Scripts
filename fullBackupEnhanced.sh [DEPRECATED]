#!bin/bash
CURRENT_BACKUP_DIR="/home/fortuna/storage/ramdisk"
BACKUP_DIR="/home/fortuna/storage/backup/"
DATE=$(date +"%d-%m-%Y [%T]")
CHECK_PID="$(pidof java)"
SESSION="MINECRAFT_SERVER"
if [ "$CHECK_PID" ]; then
FIRST_TIME="$(date +" [%H:%M:%S]")"
screen -S $SESSION -p 0 -X stuff "say $FIRST_TIME Comenzando copia de seguridad..."`echo -ne '\015'`
screen -S $SESSION -p 0 -X stuff 'save-all'`echo -ne '\015'`
sleep 10
START_TIME=`date +%s`
cd $CURRENT_BACKUP_DIR
tar cf "$BACKUP_DIR$DATE.tar.lz4" --use-compress-prog=lz4 world world_nether world_the_end
find "$BACKUP_DIR" -mmin +240 -delete
END_TIME=`date +%s`
let FINAL_TIME=$END_TIME-$START_TIME
LAST_TIME="$(date +" [%H:%M:%S]")"
screen -S $SESSION -p 0 -X stuff "say $LAST_TIME Copia de seguridad completada en $FINAL_TIME segundo(s)"`echo -ne '\015'`
fi

