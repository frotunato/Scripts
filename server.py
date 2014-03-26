import threading
import sys
import lz4
import os
import tarfile
import datetime
import time
from apscheduler.scheduler import Scheduler


path = "/home/fortuna/test"
path2 = "/home/fortuna/directorio"
	

def compress(file):
	data = open(file,"r+b")
        if data.name.endswith('.tar'):
                compressed_data = open(data.name + ".lz4","w")
                compressed_data.write(lz4.compress(data.read()))
	else:
		print "The file type is not the expected."

def decompress(file):
	data = open(file,"r+b")
	if data.name.endswith('.lz4'):
		decompressed_data = open(data.name[:-4],"w")
		decompressed_data.write(lz4.decompress(data.read()))
	else:
		print "The file type is not the expected." 
def restore():
	dirs = os.listdir ( path )
	fileList = list()
	for file in dirs:
		fileList.append(file)
	fileList.sort()
	print fileList
	selectedFile = fileList[input("Select a file to restore (0 - " + str(len(fileList) - 1) + "): ")]
	decompress(path + "/" + selectedFile)

def make_tar():
	dateAndTime = time.strftime("%d-%m-%Y") + " [" + time.strftime("%X")+ "].tar"
	tar = tarfile.open(str(dateAndTime), "w")
	tar.add ( path2 )
	tar.close()
	return tar.name

def backup():
	tarFile = make_tar()
	compress(tarFile)
	os.remove(tarFile)

try:
	if sys.argv[1] == "restore":
		restore()
	if sys.argv[1] == "backup":
		backup()
	if sys.argv[1] == "help":
		print "Avaible inputs: 'restore', 'backup'."
	else:
		print "The input argument is not valid."
except:
	print "There is no argument, type 'help' to get more information."

