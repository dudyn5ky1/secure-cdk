# Security abstraction for AWS CDK library. Create AWS resources with best security practices applied for you.

[![npm version](https://img.shields.io/npm/v/secure-cdk.svg)](https://www.npmjs.com/package/secure-cdk)
[![npm](https://img.shields.io/npm/dm/secure-cdk.svg)](https://www.npmjs.com/package/secure-cdk)

## Description

The purpose of this package is to enforce best security practices for `AWS` services. It uses `AWS CDK` under the hood to create resources and won't without it.

You may find that some of the rules are too strict for your use cases, but you always have a possibility be explicitly overriding them.

## Installation

`npm i secure-cdk --save-dev`

or

`yarn add secure-cdk -D`

## Usage

### S3 Bucket

By using `createSecureS3Bucket` function to generate your S3 Bucket, you get the following properties set by default.

| Property   | Value | Description                | AWS CDK Default |
| ---        | ---   | ---                        | ---             |
| enforceSSL | true  | Enforces SSL for requests. | false           |

```typescript
import { createSecureS3Bucket } from 'secure-cdk';

const mySiteBucket = createSecureS3Bucket(this, 'myBucket', {
  bucketName: 'my-bucket-name',
  websiteIndexDocument: 'index.html'
});

```

### CloudFront Distribution


