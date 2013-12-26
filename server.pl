#!/usr/bin/perl
use File::Temp qw/ tempfile tempdir /;
use Minecraft::RCON;
use 5.018;
use File::Path qw(make_path remove_tree);
use strict;
use warnings;
use Time::Piece;
################### GENERAL VARIABLES ##################
my $RAMDISK_MIRROR_PATH="/home/fortuna/storage/ramdisk";
my $BACKUP_PATH="/home/fortuna/storage/backup";
my $SERVER_PATH="/home/fortuna/minecraft";
my $USER_PATH="/home/fortuna";
my $RAMDISK="/home/fortuna/ramdisk";
my $CHECK_PID = qx(pidof java);
my $DATE = Time::Piece->new->strftime("%d-%m-%Y'\040'[%H:%M]");
my $PASSWORD="*********";
####################### FUNCTIONS ######################

sub buildCron{
my $tmp = File::Temp->new( TEMPLATE => 'cronjobs_XXXX', DIR => "$USER_PATH");
open(my $fh, '>>', $tmp) or die "Could not open file '$tmp' $!";
print $fh "*/1 * * * * perl $USER_PATH/server sync\n";
print $fh "*/15 * * * * perl $USER_PATH/server backup\n";
#print $fh "*/100 * * * * perl $USER/server upload\n";
qx(crontab $tmp);
close $fh;
}

sub eraseCron{
qx(crontab -r);
}

sub selectBackup{
my @args = @_;
opendir(my $DH, $BACKUP_PATH) or die "Error opening $BACKUP_PATH: $!";
my %files = map { $_ => (stat("$BACKUP_PATH/$_"))[9] } grep(! /^\.\.?$/, readdir($DH));
closedir($DH);
my @sorted_files = sort { $files{$b} <=> $files{$a} } (keys %files);
return $sorted_files[$_[0]];
}

sub decompress{
my $NEWEST_BACKUP = &selectBackup(0);
my $FILENAME = "$NEWEST_BACKUP";
$FILENAME =~ s/\.\w{3}$//;
system("lz4c -d $BACKUP_PATH/$NEWEST_BACKUP");
system("tar -C / -xf $BACKUP_PATH/$FILENAME");
unlink("$BACKUP_PATH/$FILENAME");
}

sub start{
if($CHECK_PID){
    print "Only one instance of the server is allowed\n";
    } else {
    system("cd $SERVER_PATH; screen -d -m java -Xmx1024M -Xms1024M -jar spigot.jar > /dev/null 2>&1 &");
    }
}

sub compress{
system("tar cf $BACKUP_PATH/$DATE.tar.lz4 --use-compress-prog=lz4c $RAMDISK_MIRROR_PATH");
}

sub syncMirrorToRamdisk{ 
system ("rsync -r $RAMDISK_MIRROR_PATH/ $RAMDISK");
}

sub syncRamdiskToMirror{
system ("rsync -ru --delete-delay  $RAMDISK/ $RAMDISK_MIRROR_PATH");
}

sub clear{
if(!$CHECK_PID){
    remove_tree( "$RAMDISK",{keep_root=>1} );
    remove_tree( "$RAMDISK_MIRROR_PATH",{keep_root=>1} );
    } else { print "The server must be off to use this option"; }
}

sub generateStructure{
my @structure = ("world","world_nether","world_the_end");
foreach my $TEMP (@structure){
    make_path("$RAMDISK_MIRROR_PATH/$TEMP");
    }
}

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
	&eraseCron;
	} else { print "The server is not running\n"; }
}

sub purge{
my $MAX_NUMBER_OF_BACKUPS=6;
opendir my($dh), $BACKUP_PATH or die "Couldn't open dir '$BACKUP_PATH': $!";
my @files = readdir $dh;
if(say scalar @files > $MAX_NUMBER_OF_BACKUPS) {
    @files = sort { -M "$BACKUP_PATH/$a" <=> -M "$BACKUP_PATH/$b" } (@files);
    unlink("$BACKUP_PATH/$files[$MAX_NUMBER_OF_BACKUPS]");
    closedir $dh;
   }
}

given ($ARGV[0]) { 
    when ("backup") {
	&compress;
	}

    when ("restore") {
	&clear;
	&decompress;
	}

    when ("purge") {
	&purge;
	}

    when ("clear") {
	&clear;
	}
  
    when ("stop") {
	&stop;	
	&syncRamdiskToMirror;
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
}
