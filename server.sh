#!/bin/bash
################ GENERAL VARIABLES ###################
LOGFILE="/home/fortuna/logfile"
USERNAME="*******"
PASSWORD="*******"
USER="/home/fortuna"
RAMDISK="/home/fortuna/ramdisk"
RAMDISK_MIRROR="/home/fortuna/storage/ramdisk"
BACKUP_PATH="/home/fortuna/storage/backup"
SERVER_PATH="/home/fortuna/minecraft"
MEGA_PATH="/Root/backups"
CHECK_PID="$(pidof java)"
DATE="$(date +"%d-%m-%Y [%T]")"
SESSION="MINECRAFT_SERVER"
######################################################

removeCron(){
(crontab -r)2>/dev/null
}

setCron(){
(crontab -l; echo "*/1 * * * * bash $USER/server sync" )2>/dev/null | crontab -
(crontab -l; echo "*/20 * * * * bash $USER/server backup" )2>/dev/null | crontab -
(crontab -l; echo "*/101 * * * * bash $USER/server upload" )2>/dev/null | crontab -
}

restoreBackup(){
cd "$RAMDISK" && sudo rm -rf *
cd "$RAMDISK_MIRROR" && sudo rm -rf * && sudo lz4 -d "$BACKUP_PATH/$NEWEST_BACKUP"
TAR="$(find $BACKUP_PATH -type f -name '*.tar' -print)"
tar -xf "$TAR" -C "$RAMDISK_MIRROR/"
rm -f "$TAR"
}

case "$1" in
	#This perform a save-all comand and proceed to do the backup. When is done it automatically removes an old backup * (See purge option)
	"backup")
	LOCAL_TIME_START="$(date +" [%H:%M:%S]")"
	screen -S "$SESSION" -p 0 -X stuff "say $LOCAL_TIME_START Comenzando copia de seguridad..."`echo -ne '\015'`
	screen -S "$SESSION" -p 0 -X stuff 'save-all'`echo -ne '\015'`
	START_TIME=`date +%s`
	cd "$RAMDISK_MIRROR" && tar cf "$BACKUP_PATH/$DATE.tar.lz4" --use-compress-prog=lz4 world world_nether world_the_end 
	END_TIME=`date +%s`
	let FINAL_TIME="$END_TIME"-"$START_TIME"
	LOCAL_TIME_END="$(date +" [%H:%M:%S]")"
	screen -S "$SESSION" -p 0 -X stuff "say $LOCAL_TIME_END Copia de seguridad completada en $FINAL_TIME segundo(s)"`echo -ne '\015'`
	bash $USER/server purge
	;;

	#This code automatically upload the $NEWEST_BACKUP to MEGA
	"upload")
	NEWEST_BACKUP="$(ls "$BACKUP_PATH" -rt | tail -1)"
	LOCAL_TIME_START="$(date +" [%H:%M:%S]")"
	screen -S "$SESSION" -p 0 -X stuff "say $LOCAL_TIME_START Subiendo última copia de seguridad..."`echo -ne '\015'`
	START_TIME=`date +%s`
	sudo megaput --no-progress "$BACKUP_PATH/$NEWEST_BACKUP" --path "$MEGA_PATH" -u "$USERNAME" -p "$PASSWORD"
	echo "$NEWEST_BACKUP" &> $LOGFILE
	END_TIME=`date +%s`
	let FINAL_TIME="$END_TIME"-"$START_TIME"
	LOCAL_TIME_END="$(date +" [%H:%M:%S]")"
	screen -S "$SESSION" -p 0 -X stuff "say $LOCAL_TIME_END Copia de seguridad subida en $FINAL_TIME segundo(s)"`echo -ne '\015'`
	;;

	#Performs an optimized syncronization between $RAMDISK and $RAMDISK_MIRROR and also delete files that no longer exist.
	"sync")
	sudo rsync -ru --delete-delay  "$RAMDISK/" "$RAMDISK_MIRROR"
	;;

	#This option stops the server after a 30 seconds countdown. It also kills the $SESSION screen and the crontab file.
	"stop")
	if [ "$CHECK_PID" ] ;then
	screen -S "$SESSION" -p 0 -X stuff "say Apagando el servidor en 30 segundos..."`echo -ne '\015'`
	sleep 15 && screen -S "$SESSION" -p 0 -X stuff "say Apagando el servidor en 15 segundos..."`echo -ne '\015'`
	sleep 5 && screen -S "$SESSION" -p 0 -X stuff "say Apagando el servidor en 10 segundos..."`echo -ne '\015'`
	sleep 5 && screen -S "$SESSION" -p 0 -X stuff "say Apagando el servidor en 5 segundos..."`echo -ne '\015'`
	sleep 5 && screen -S "$SESSION" -p 0 -X stuff "stop"`echo -ne '\015'`
	sleep 5 && bash $USER/server sync && removeCron && screen -X -S "$SESSION" kill
	else
	echo "El servidor no está corriendo"
	fi
	;;

	"restore")
	#If the server is running, it sends a message through the game and stops it before proceed.
	NEWEST_BACKUP="$(ls "$BACKUP_PATH" -rt | tail -1)"
	if [ "$CHECK_PID" ] ;then
	screen -S "$SESSION" -p 0 -X stuff "say Restaurando copia de seguridad: ${NEWEST_BACKUP%%.*}"`echo -ne '\015'`
	sleep 2 && bash $USER/server stop
	fi

	#This if sentence checks for a second argument in the restore option. 
	#If there is one, it will download the latest backup uploaded and replace it.
	if [ "$2" = "mega" ] ;then
	NEWEST_BACKUP="`grep .tar.lz4 $LOGFILE`"
	megaget -u "$USERNAME" -p "$PASSWORD" --path "$BACKUP_PATH" "$MEGA_PATH/$NEWEST_BACKUP"
	fi
	restoreBackup
	;;

	#It adds to the user crontab a bunch of scheduled backups and runs the server.
	"start")
	if [ ! "$CHECK_PID" ]; then
	removeCron
	setCron
	(mkdir "$RAMDISK_MIRROR/world" "$RAMDISK_MIRROR/world_the_end" "$RAMDISK_MIRROR/world_nether") 2>/dev/null
	sudo rsync -r "$RAMDISK_MIRROR/" "$RAMDISK"
	screen -d -m -S "$SESSION"
	sleep 1 && screen -S "$SESSION" -X stuff "cd $SERVER_PATH && sudo java -Xmx1700M -Xms1700M -jar minecraft_server.jar && cd $USER"`echo -ne '\015'`
	else
	echo "Sólo puede haber una instancia del servidor"
	fi
	;;

	#This will define the maximum number of backups in $BACKUP_PATH.
	"purge")
	MAX_NUMBER_OF_BACKUPS="6"
	OLDEST_BACKUP="$(ls "$BACKUP_PATH" -t | tail -1)"
	CURRENT_BACKUP_AMOUNT="$(find "$BACKUP_PATH" -type f  -name '*.lz4' -print | wc -l)"
	if [ "$CURRENT_BACKUP_AMOUNT" -gt "$MAX_NUMBER_OF_BACKUPS" ] ;then
	rm "$OLDEST_BACKUP"
	fi
	;;

esac
