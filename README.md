# Security abstraction for AWS CDK library. Create AWS resources with best security practices applied for you.

[![npm version](https://img.shields.io/npm/v/secure-cdk.svg)](https://www.npmjs.com/package/secure-cdk)
[![npm](https://img.shields.io/npm/dm/secure-cdk.svg)](https://www.npmjs.com/package/secure-cdk)

## Description

The purpose of this package is to enforce best security practices for `AWS` services. It uses `AWS CDK` under the hood to create resources and won't work without it.

You may find that some of the rules are too strict for your use cases, but you always have a possibility of explicitly overriding them. If you do that, you will get a warning that will remind you about the security violations.

## Installation

`npm i secure-cdk --save-dev`

or

`yarn add secure-cdk -D`

## Usage

### S3 Bucket

By using `SecureBucket` class instead of the AWS's `Bucket` construct, you are getting the following properties set by default.

| Property         | Value                  | Description                                                 | AWS CDK Default |
| ---              | ---                    | ---                                                         | ---             |
| enforceSSL       | true                   | Enforces SSL for requests.                                  | false           |
| publicReadAccess | false                  | Grants public read access to all objects in the bucket.     | false           |
| encryption       | Encrypted (S3 managed) | The kind of server-side encryption to apply to this bucket. | Unencrypted     |

```typescript
import { SecureBucket } from 'secure-cdk';

const mySiteBucket = new SecureBucket(this, 'my-bucket', {
  bucketName: 'my-bucket-name',
  websiteIndexDocument: 'index.html'
});

```

### CloudFront Distribution

Security wrapper for `Distribution` construct.

| Property               | Value                  | Description                                                                                    | AWS CDK Default |
| ---                    | ---                    | ---                                                                                            | ---             |
| minimumProtocolVersion | TLS_V1_2_2021          | The minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections. | TLS_V1_2_2021   |

`createSecureBehavior` is a function used to create preconfigured behaviors for CloudFront distributions.

| Property               | Value                  | Description                                                                                    | AWS CDK Default |
| ---                    | ---                    | ---                                                                                            | ---             |
| viewerProtocolPolicy   | HTTPS_ONLY             | The protocol that viewers can use to access the files controlled by this behavior.             | ALLOW_ALL       |


```typescript
import { createSecureBehavior, SecureDistribution } from 'secure-cdk';

const distribution = new SecureDistribution(this, 'my-distribution', {
  defaultBehavior: createSecureBehavior({
    origin: new S3Origin(mySiteBucket)
  })
});

```

### IAM Role (PolicyStatement)

Security wrapper for `PolicyStatement` construct. Does not set default properties, however warns when:

- `*` passed in `actions` property;
- `<resource>:*` passed in `actions` property;
- `*` passed in `resources` property;
- `.addResources` called with `*`;
- `.addActions` called with `*` or `<resource>:*`;


```typescript
import { Effect } from '@aws-cdk/aws-iam';
import { SecurePolicyStatement } from 'secure-cdk';

const policyStatement = new SecurePolicyStatement(this, 'my-policy-statement', {
  actions: ['cloudfront:*'],
  resources: ['*'],
  effect: Effect.ALLOW
});
// or
policyStatement.addActions('*');
policyStatement.addResources('*');

```

## TODO

- [ ] Alternative automatic checker (extensions of a `Stack`);
- [ ] Centralized warning system to awoid warning duplication;
- [ ] Inclusion of resource identifier in warning;
