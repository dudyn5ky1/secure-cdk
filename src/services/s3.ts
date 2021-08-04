import { Bucket, BucketProps } from '@aws-cdk/aws-s3';
import { Construct } from '@aws-cdk/core';

export const createSecureS3Bucket = (scope: Construct, id: string, props?: BucketProps): Bucket => {
  return new Bucket(
    scope, id, {
      enforceSSL: true,
      ...props
    }
  );
};
