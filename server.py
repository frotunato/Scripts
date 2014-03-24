import uuid
import timeit
import lz4
import os
import tarfile

path = "/home/fortuna/test"


def compress(file):
        data = open(file,"r")
        if data.name.endswith('.tar'):
                compressed_data = open(data.name + ".lz4","w")
                compressed_data.write(lz4.compress(data.read()))
        else:
                print "The file type is not the expected."
def decompress(file):
        data = open(file,"r")
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
        tar = tarfile.open("TAR.tar", "w")
        path2 = "/home/fortuna/directorio"
        dirs = os.listdir ( path2 )
        for file in dirs:
                tar.add ( file )
        tar.close()

make_tar()
