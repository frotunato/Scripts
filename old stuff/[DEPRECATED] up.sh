#!bin/bash
DIR="/home/fortuna/ramdisk"
CURRENT="/home/fortuna/storage/ramdisk"
MINECRAFT="/home/fortuna/minecraft"
cd "$MINECRAFT"
sudo rsync -r "$CURRENT/" "$DIR"
sudo java -Xmx1700M -Xms1700M -jar spigot.jar

