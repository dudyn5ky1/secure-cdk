import { PolicyStatement, PolicyStatementProps, Effect } from '@aws-cdk/aws-iam';

import { warnIfEquals, warn } from './../utils';

const resourcePlaceholder = '<resource_placeholder>';

const PolicyStatementWarning = {
  ActionWildcardPassed: "'*' passed as an action. Please specify exact permissions granted.",
  ActionResourceWildcardPassed: `'${resourcePlaceholder}:*' passed as an action. Please specify exact permissions granted.`,
  ResourceWildcardPassed: "'*' passed as a resource. Please specify exact resource or group of resources to which permissions are granted."
}

export class SecurePolicyStatement extends PolicyStatement {
  constructor(props: PolicyStatementProps) {
    const actionsPresent = props.actions?.length;
    const resourcesPresent = props.resources?.length;
    if (!actionsPresent || !resourcesPresent || props.effect !== Effect.ALLOW) {
      super(props);
      return;
    }

    const propActions = props.actions || [];
    for (let i = 0; i < propActions.length; i++) {
      const action = propActions[i];
      warnIfEquals(action, '*', PolicyStatementWarning.ActionWildcardPassed);
      if (!action.includes(':*')) {
        continue;
      }
      const resource = action.split(':')[0];
      warn(PolicyStatementWarning.ActionResourceWildcardPassed.replace(resourcePlaceholder, resource));
    }

    const propResources = props.resources || [];
    for (let i = 0; i < propResources.length; i++) {
      const resource = propResources[i];
      warnIfEquals(resource, '*', PolicyStatementWarning.ResourceWildcardPassed);
    }

    super(props);
  }
}
