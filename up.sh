#!bin/bash
DIR="/home/fortuna/ramdisk"
CURRENT="/home/fortuna/storage/current"
MINECRAFT="/home/fortuna/minecraft"
cd "$MINECRAFT"
mkdir $DIR/world
mkdir $DIR/world_the_end
mkdir $DIR/world_nether
sudo rsync -r "$CURRENT/" "$DIR"
sudo java -Xmx1700M -Xms1700M -jar spigot.jar

