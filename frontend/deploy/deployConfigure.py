from datetime import datetime
from common import uploadDirectoryToS3

def deploy():
    release = datetime.utcnow().isoformat()
    print ('Deploying configure release... ' + release)
    uploadDirectoryToS3('../src/configure/dist/pwa','eel3-app','configure/' + release,'us-east-2')
    print (release + ' successfully deployed.')

if __name__ == '__main__':
    deploy()
