import { Distribution, DistributionProps, SecurityPolicyProtocol, BehaviorOptions, ViewerProtocolPolicy } from '@aws-cdk/aws-cloudfront';
import { Construct } from '@aws-cdk/core';

export class SecureDistribution extends Distribution {
  constructor(scope: Construct, id: string, props?: DistributionProps) {
    super(scope, id, {
      minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2019,
      ...props
    } as DistributionProps);
  }
}

export const createSecureBehavior = (behaviorOptions: BehaviorOptions): BehaviorOptions => ({
  viewerProtocolPolicy: ViewerProtocolPolicy.HTTPS_ONLY,
  ...behaviorOptions
});
