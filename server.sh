#!/bin/bash
################ GENERAL VARIABLES ###################
USER="/home/fortuna"
RAMDISK="/home/fortuna/ramdisk"
RAMDISK_MIRROR="/home/fortuna/storage/ramdisk"
BACKUP_PATH="/home/fortuna/storage/backup"
SERVER_PATH="/home/fortuna/minecraft"
MINECRAFT_PATH="/home/fortuna/minecraft"
CHECK_PID="$(pidof java)"
DATE="$(date +"%d-%m-%Y[%T]")"
NEWEST_BACKUP="$(ls "$BACKUP_PATH" -rt | tail -1)"
SESSION="MINECRAFT_SERVER"
######################################################

case "$1" in
	"backup")
	LOCAL_TIME_START="$(date +" [%H:%M:%S]")"
	screen -S $SESSION -p 0 -X stuff "say $LOCAL_TIME_START Comenzando copia de seguridad..."`echo -ne '\015'`
	screen -S $SESSION -p 0 -X stuff 'save-all'`echo -ne '\015'`
	START_TIME=`date +%s`
	cd "$RAMDISK_MIRROR" && tar cf "$BACKUP_PATH/$DATE.tar.lz4" --use-compress-prog=lz4 world world_nether world_the_end 
	find "$BACKUP_PATH/" -mmin +240 -delete
	END_TIME=`date +%s`
	let FINAL_TIME="$END_TIME"-"$START_TIME"
	LOCAL_TIME_END="$(date +" [%H:%M:%S]")"
	screen -S $SESSION -p 0 -X stuff "say $LOCAL_TIME_END Copia de seguridad completada en $FINAL_TIME segundo(s)"`echo -ne '\015'`
	;;

	"upload")
	USERNAME="*****"
	PASSWORD="*****"
	MEGA_DIR="/Root/backups"
	LOCAL_TIME_START="$(date +" [%H:%M:%S]")"
	screen -S "$SESSION" -p 0 -X stuff "say $LOCAL_TIME_START Subiendo última copia de seguridad..."`echo -ne '\015'`
	START_TIME=`date +%s`
	sudo megaput --no-progress "$BACKUP_PATH/$NEWEST_BACKUP" --path "$MEGA_DIR" -u "$USERNAME" -p "$PASSWORD"
	END_TIME=`date +%s`
	let FINAL_TIME="$END_TIME"-"$START_TIME"
	LOCAL_TIME_END="$(date +" [%H:%M:%S]")"
	screen -S "$SESSION" -p 0 -X stuff "say $LOCAL_TIME_END Copia de seguridad subida en $FINAL_TIME segundo(s)"`echo -ne '\015'`
	;;

	"sync")
	sudo rsync -ru --delete-delay  "$RAMDISK/" "$RAMDISK_MIRROR"
	;;

	"stop")
	if [ "$CHECK_PID" ] ;then
	screen -S $SESSION -p 0 -X stuff "say Apagando servidor en 30 segundos..."`echo -ne '\015'`
	sleep 15
	screen -S $SESSION -p 0 -X stuff "say Apagando servidor en 15 segundos..."`echo -ne '\015'`
	sleep 5
	screen -S $SESSION -p 0 -X stuff "say Apagando servidor en 10 segundos..."`echo -ne '\015'`
	sleep 5
	screen -S $SESSION -p 0 -X stuff "say Apagando servidor en 5 segundos..."`echo -ne '\015'`
	sleep 5
	screen -S $SESSION -p 0 -X stuff "stop"`echo -ne '\015'`
	sleep 5
	screen -S $SESSION -p 0 -X stuff "bash /home/fortuna/server sync"`echo -ne '\015'`
	else
	echo "El servidor no está corriendo"
	fi
	;;

	"restore")
	if [ "$CHECK_PID" ] ;then
	screen -S "$SESSION" -p 0 -X stuff "say Restaurando copia de seguridad {$NEWEST_BACKUP}"`echo -ne '\015'`
	sleep 2
	bash /home/fortuna/server stop
	sleep 1
	fi
	cd "$RAMDISK" && sudo rm -r *;cd "$RAMDISK_MIRROR" && sudo rm -r *
	cd "$USER"; sudo lz4 -d "$BACKUP_PATH/$NEWEST_BACKUP"
	TAR="$(find $BACKUP_PATH -type f -name '*.tar' -print)"
	tar -xf "$TAR" -C "$RAMDISK_MIRROR/"
	rm -f "$TAR"
	;;

	"start")
	if [ ! "$CHECK_PID" ]; then
	sudo rsync -r "$RAMDISK_MIRROR/" "$DIR"
	screen -d -m -S "$SESSION"
	sleep 1
	screen -S "$SESSION" -X stuff "cd $SERVER_PATH && sudo java -Xmx1700M -Xms1700M -jar minecraft_server.jar"`echo -ne '\015'`
	else
	echo "Sólo puede haber una instancia del servidor"
	fi
	;;
esac
