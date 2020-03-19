from datetime import datetime
import os
import mimetypes

try:
   import boto3
except ImportError:
   print(f'Error: boto3 is required. Please install.')
   print(f'Try: pip install boto3')

def getMimeType(key):
    mimetype, _ = mimetypes.guess_type(key)
    if mimetype is None:
        if key.find('.woff2') > 0:
            mimetype = 'font/woff2'
        elif key.find('.woff') > 0:
            mimetype = 'font/woff'
        else:
            print(f'Error: mimetype not found for {key}.')
            mimetype = 'application/text'
    return mimetype

def uploadDirectory(path,bucket, region):
    s3 = boto3.client('s3', region_name=region)
    pathLength = len(path) + 1
    for root,dirs,files in os.walk(path):
        for file in files:
            local_path = os.path.join(root,file)
            key = local_path[pathLength:].replace('\\','/')
            print('Uploading ' + key + '...')
            mimetype = getMimeType(key)
            s3.upload_file(
                Filename=os.path.join(root,file),
                Bucket=bucket,
                Key=key,
                ExtraArgs={
                    "ContentType": mimetype
                }
            )

def deploy():
    releaseDate = datetime.utcnow().date().isoformat()
    releaseCount = 1
    #TODO: Check if something was already released on this date. If so increment release count.
    release = releaseDate + '-' + str(releaseCount)
    print ('Deploying new release... ' + release)
    uploadDirectory('../src/app/dist/pwa','eel3-app','us-east-2')
    print (release + ' successfully deployed.')

if __name__ == '__main__':
    deploy()
