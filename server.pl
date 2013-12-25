#!/usr/bin/perl
use 5.018;
use File::Path qw(make_path remove_tree);
use strict;
use warnings;
use Time::Piece;
my $RAMDISK_MIRROR_PATH="/home/fortuna/storage/ramdisk";
my $RAMDISK="/home/fortuna/ramdisk";
my $BACKUP_PATH="/home/fortuna/storage/backup";
my $CHECK_PID = qx(pidof java);
my $DATE = Time::Piece->new->strftime("%d-%m-%Y [%H:%M]");

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

sub compress{
qx(tar cf "$BACKUP_PATH/$DATE.tar.lz4" --use-compress-prog=lz4c "$RAMDISK_MIRROR_PATH");
}

sub sync{ 
&generateStructure; 
qx (rsync -r $RAMDISK_MIRROR_PATH/ $RAMDISK);
}

sub clear{
remove_tree( "$RAMDISK",{keep_root=>1} );
remove_tree( "$RAMDISK_MIRROR_PATH",{keep_root=>1} );
}

sub generateStructure{
my @structure = ("world","world_nether","world_the_end");
foreach my $TEMP (@structure){
    make_path("$RAMDISK_MIRROR_PATH/$TEMP");
    }
}

sub purge{
my $MAX_NUMBER_OF_BACKUPS=6;
opendir my($dh), $BACKUP_PATH or die "Couldn't open dir '$BACKUP_PATH': $!";
my @files = readdir $dh;
if(say scalar @files > $MAX_NUMBER_OF_BACKUPS){
@files = sort { -M "$BACKUP_PATH/$a" <=> -M "$BACKUP_PATH/$b" } (@files);
unlink("$BACKUP_PATH/$files[$MAX_NUMBER_OF_BACKUPS]");
closedir $dh;
}

given ($ARGV[0]) { 
    when ("backup") {
	&compress;
	}

    when ("restore") {
	&clear;
	&decompress;
	&sync;
	}

    when ("purge") {
	&purge;
	}

    when ("clear") {
	&clear;
	}
  
    when ("start") {
	}  
}


