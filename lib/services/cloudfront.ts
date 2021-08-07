import { Distribution, DistributionProps, SecurityPolicyProtocol, BehaviorOptions, ViewerProtocolPolicy } from '@aws-cdk/aws-cloudfront';
import { Construct } from '@aws-cdk/core';

import { warnIfNotEquals, warnIfEquals } from './../utils';

enum DistributionSecurityWarning {
  ProtocolVersionIsOutdated = 'TLS Version of the CloudFront Distribution is outdated.',
  HttpTrafficAllowed = 'HTTP traffic allowed in CloudFront Distribution behavior.'
}

export class SecureDistribution extends Distribution {
  constructor(scope: Construct, id: string, props?: DistributionProps) {
    warnIfNotEquals(props?.minimumProtocolVersion, SecurityPolicyProtocol.TLS_V1_2_2021, DistributionSecurityWarning.ProtocolVersionIsOutdated);

    super(scope, id, {
      minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
      ...props
    } as DistributionProps);
  }
}

export const createSecureBehavior = (behaviorOptions: BehaviorOptions): BehaviorOptions => {
  warnIfEquals(behaviorOptions.viewerProtocolPolicy, ViewerProtocolPolicy.ALLOW_ALL, DistributionSecurityWarning.HttpTrafficAllowed);

  return {
    viewerProtocolPolicy: ViewerProtocolPolicy.HTTPS_ONLY,
    ...behaviorOptions
  }
};
