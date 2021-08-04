import { Bucket, BucketProps } from '@aws-cdk/aws-s3';
import { Construct } from '@aws-cdk/core';

export const createSecureS3Bucket = (scope: Construct, id: string, props?: BucketProps): Bucket => {
  return new Bucket(
    scope, id, {
      enforceSSL: true,
      ...props
    } as BucketProps
  );
};

export class SecureBucket extends Bucket {
  constructor(scope: Construct, id: string, props?: BucketProps) {
    super(scope, id, {
      enforceSSL: true,
      ...props
    });
  }
}
