import json

try:
   import boto3
except ImportError:
   print(f'Error: boto3 is required. Please install.')
   print(f'Try: pip install boto3')

def provision(name,region):
    cloudfront = boto3.client('cloudfront',region_name=region)

    print ('Creating cloudfront...')
    #TODO: Automate this by comparing what works in production and bringing it here
    #cloudfront.create_distribution()

if __name__ == '__main__':
    provision('eel3-app','us-east-2')