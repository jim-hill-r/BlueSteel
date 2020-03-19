import json

try:
   import boto3
except ImportError:
   print(f'Error: boto3 is required. Please install.')
   print(f'Try: pip install boto3')

def provision(bucket, region):
    s3 = boto3.client('s3', region_name=region)

    print ('Creating app s3 bucket...')
    try:
        location = {'LocationConstraint': region}
        s3.create_bucket(Bucket=bucket,CreateBucketConfiguration=location)
    except:
        print('Exception: Probably already exists')
        #TODO: Check that this is already exists and ignore

    website_configuration = {
        'ErrorDocument': {'Key': 'error.html'},
        'IndexDocument': {'Suffix': 'index.html'},
    }

    policy = {
        'Version': '2012-10-17',
        'Statement': [{
        'Sid': 'AddPerm',
        'Effect': 'Allow',
        'Principal': '*',
        'Action': ['s3:GetObject'],
        'Resource': f'arn:aws:s3:::{bucket}/*'
        }]
    }

    # Convert the policy from JSON dict to string
    policy = json.dumps(policy)

    # Set the website configuration
    s3 = boto3.client('s3')
    s3.put_bucket_website(Bucket=bucket,WebsiteConfiguration=website_configuration)
    s3.put_bucket_policy(Bucket=bucket, Policy=policy)

if __name__ == '__main__':
    provision('eel3-app','us-east-2')