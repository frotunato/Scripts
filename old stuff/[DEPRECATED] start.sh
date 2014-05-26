#!bin/bash
SESSION="MINECRAFT_SERVER"
screen -d -m -S "$SESSION" 
sleep 1
screen -S "$SESSION" -X stuff 'bash /home/fortuna/up.sh'`echo -ne '\015'`
