import { Bucket, BucketProps, BucketEncryption } from '@aws-cdk/aws-s3';
import { Construct } from '@aws-cdk/core';

import { warnIfEquals } from './../utils';

enum BucketSecurityWarnings {
  SSLIsNotEnforced = 'SSL in S3 Bucket is not enforced.',
  PublicReadAccessEnabled = 'Contents of the S3 Bucket are publicly accessible.',
  BucketIsNotEncrypted = 'S3 Bucket is not encrypted.'
}

export class SecureBucket extends Bucket {
  constructor(scope: Construct, id: string, props?: BucketProps) {
    warnIfEquals(props?.enforceSSL, false, BucketSecurityWarnings.SSLIsNotEnforced);
    warnIfEquals(props?.publicReadAccess, true, BucketSecurityWarnings.PublicReadAccessEnabled);
    warnIfEquals(props?.encryption, BucketEncryption.UNENCRYPTED, BucketSecurityWarnings.BucketIsNotEncrypted);

    super(scope, id, {
      enforceSSL: true,
      publicReadAccess: false,
      encryption: BucketEncryption.S3_MANAGED,
      ...props
    });
  }
}
