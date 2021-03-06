#!/usr/bin/perl
use strict;
use warnings;
use 5.018;
use File::Path qw(make_path remove_tree);
use File::Basename;
use File::Temp qw/ tempfile tempdir /;
use Time::Piece;
use Minecraft::RCON;

####################################################################################
################################## GENERAL VARIABLES ###############################
####################################################################################

my $RAMDISK_MIRROR_PATH="/home/fortuna/storage/ramdisk";
my $BACKUP_PATH="/home/fortuna/storage/backup";
my $SERVER_PATH="/home/fortuna/minecraft";
my $USER_PATH="/home/fortuna";
my $RAMDISK="/home/fortuna/ramdisk";
my $CHECK_PID = qx(pidof java);
my $DATE = Time::Piece->new->strftime("%d.%m.%Y-[%T]");
my $PASSWORD="*************";
my $prueba="$DATE.tar";
####################################################################################
###################################### FUNCTIONS ###################################
####################################################################################


#Adds multiple cronjobs
sub buildCron{
        my $tmp = File::Temp->new( TEMPLATE => 'cronjobs_XXXX', DIR => "$USER_PATH");
        open(my $fh, '>>', $tmp) or die "Could not open file '$tmp' $!";
        print $fh "*/1 * * * * perl $USER_PATH/$0 sync\n";
        print $fh "*/2 * * * * perl $USER_PATH/$0 backup\n";
        system("crontab $tmp");
        close $fh;
}

#Delete the cron user file
sub eraseCron{
        system("crontab -r");
}

#Returns a specific backup (defined in the input) of $BACKUP_PATH
sub selectBackup{
        my @args = @_;
        opendir(my $DH, $BACKUP_PATH) or die "Error opening $BACKUP_PATH: $!";
        my %files = map { $_ => (stat("$BACKUP_PATH/$_"))[9] } grep(! /^\.\.?$/, readdir($DH));
        closedir($DH);
        my @sorted_files = sort { $files{$b} <=> $files{$a} } (keys %files);
        return $sorted_files[$_[0]];
}

#Decompress (by default) the newest backup in $BACKUP_PATH
sub decompress{
        my @suffixList=(".lz4");
	my $FULLNAME = &selectBackup(0);
	my $BACKUP_LZ4 = basename("$FULLNAME");
	my $BACKUP_TAR = fileparse("$BACKUP_PATH/$BACKUP_LZ4",@suffixList);
        my @prueba=("tar -C / -xf $BACKUP_PATH/$BACKUP_TAR");
	system("lz4c -d $BACKUP_PATH/$BACKUP_LZ4");
	system("tar -C / -xf $BACKUP_PATH/$BACKUP_TAR");
	unlink("$BACKUP_PATH/$BACKUP_TAR");
}

#Launchs the server using 'screen'. The screen's name is defined in $SESSION variable
sub start{
        if($CHECK_PID){
                print "Only one instance of the server is allowed\n";
                } else {
                        system("cd $SERVER_PATH; screen -d -m java -Xmx1024M -Xms1024M -jar spigot.jar > /dev/null 2>&1 &");
                }
        }
#Makes a tarball of $RAMDISK_MIRROR_PATH and compress it.
sub compress{
        if ($CHECK_PID){
                my $rcon= Minecraft::RCON->new( { password => "$PASSWORD" } );
                $rcon->connect;
                my $TIME_A = time;
                $rcon->command("say Comenzando copia de seguridad...");
                system("tar cf $BACKUP_PATH/$DATE.tar.lz4 --use-compress-prog=lz4c $RAMDISK_MIRROR_PATH");
                my $RUN_TIME = time - $TIME_A;
                $rcon->command("say Copia de seguridad completada en $RUN_TIME segundo(s)");
                } else {
                        system("tar cf $BACKUP_PATH/$DATE.tar.lz4 --use-compress-prog=lz4c $RAMDISK_MIRROR_PATH");
                }
        }

#Makes a sync between $RAMDISK_MIRROR_PATH and $RAMDISK
sub syncMirrorToRamdisk{ 
        system ("rsync -r $RAMDISK_MIRROR_PATH/ $RAMDISK");
}

#Makes a sync between $RAMDISK and $RAMDISK_MIRROR_PATH deleting all the files that no longer exist. 
sub syncRamdiskToMirror{
        system ("rsync -ru --delete-delay  $RAMDISK/ $RAMDISK_MIRROR_PATH");
}

#CAUTION! This WILL DESTROY ALL THE DATA in $RAMDISK and RAMDISK_MIRROR_PATH 
sub clear{
        if($CHECK_PID){
                print "The server must be off to use this option\n"; 
        } else {
	        remove_tree( "$RAMDISK",{keep_root=>1} );
                remove_tree( "$RAMDISK_MIRROR_PATH",{keep_root=>1} );
		}
}

#Generates in $RAMDISK_MIRROR_PATH the necessary directories of a standard minecraft server
sub generateStructure{
        my @structure = ("world","world_nether","world_the_end");
        foreach my $TEMP (@structure){
                make_path("$RAMDISK_MIRROR_PATH/$TEMP");
        }
}

##Stops the server and notify the players.
sub stop{
        if ($CHECK_PID) {
                my $rcon= Minecraft::RCON->new( { password => "$PASSWORD" } );
                $rcon->connect;
                $rcon->command("say El servidor se detendrá en 30 segundos...");
                sleep 15;
                $rcon->command("say El servidor se detendrá en 15 segundos...");
                sleep 5;
                $rcon->command("say El servidor se detendrá en 10 segundos...");
                sleep 5;
                $rcon->command("say El servidor se detendrá en 5 segundos...");
                sleep 5;
                $rcon->command("stop");
                $rcon->disconnect;
                }
        }

#Removes the oldest element of the backup folder if there are more elements than $MAX_NUMBER_OF_BACKUPS variable
sub purge{
        my $MAX_NUMBER_OF_BACKUPS=6;
        opendir my($dh), $BACKUP_PATH or die "Couldn't open dir '$BACKUP_PATH': $!";
        my @files = readdir $dh;
        if (say scalar @files > "$MAX_NUMBER_OF_BACKUPS") {
                @files = sort { -M "$BACKUP_PATH/$a" <=> -M "$BACKUP_PATH/$b" } (@files);
                unlink("$BACKUP_PATH/$files[$MAX_NUMBER_OF_BACKUPS]");
                closedir $dh;
        }
}

####################################################################################
####################################### SCRIPT INPUT ###############################
####################################################################################


given ($ARGV[0]) { 
        when ("backup") {
                &compress;
                &purge;
        }

        when ("restore") {
                &stop;
                &eraseCron;
                &clear;
                &decompress;
        }

        when ("clear") {
                &clear;
        }

        when ("purge") {
                &purge;
        }

        when ("stop") {
                &stop;        
                &syncRamdiskToMirror;
                &eraseCron;
        }
        
        when ("start") {
                &generateStructure;
                &syncMirrorToRamdisk;
                &buildCron;
                &start;
        }
        when ("sync") {
                &syncRamdiskToMirror;
        }

        default { say "None of the expected values"; }
}

