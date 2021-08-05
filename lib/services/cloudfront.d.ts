import { Distribution, DistributionProps, BehaviorOptions } from '@aws-cdk/aws-cloudfront';
import { Construct } from '@aws-cdk/core';
export declare class SecureDistribution extends Distribution {
    constructor(scope: Construct, id: string, props?: DistributionProps);
}
export declare const createSecureBehavior: (behaviorOptions: BehaviorOptions) => BehaviorOptions;
