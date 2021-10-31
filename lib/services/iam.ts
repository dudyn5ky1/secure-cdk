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
    super(props);

    const actionsPresent = props.actions?.length;
    const resourcesPresent = props.resources?.length;
    if (!actionsPresent || !resourcesPresent || props.effect !== Effect.ALLOW) {
      return;
    }

    const propActions = props.actions || [];
    this._validateActions(propActions);

    const propResources = props.resources || [];
    this._validateResources(propResources);
  }

  addActions(...actions: string[]) {
    this._validateActions(actions);
    super.addActions(...actions);
  }

  addResources(...resources: string[]) {
    this._validateResources(resources);
    super.addResources(...resources);
  }

  _validateActions(actions: string[]) {
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      warnIfEquals(action, '*', PolicyStatementWarning.ActionWildcardPassed);
      if (!action.includes(':*')) {
        continue;
      }
      const resource = action.split(':')[0];
      warn(PolicyStatementWarning.ActionResourceWildcardPassed.replace(resourcePlaceholder, resource));
    }
  }

  _validateResources(resources: string[]) {
    for (let i = 0; i < resources.length; i++) {
      const resource = resources[i];
      warnIfEquals(resource, '*', PolicyStatementWarning.ResourceWildcardPassed);
    }
  }
}
