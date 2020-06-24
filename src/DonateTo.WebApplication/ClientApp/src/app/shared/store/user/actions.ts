import { createAction, props } from '@ngrx/store';
import { OrganizationModel, UserModel } from '../../models';

export const userOrganizationLink = createAction(
  '[User] Link user to organization',
  props<{ user: UserModel; organizations: OrganizationModel[] }>()
);
export const userOrganizationLinkSuccess = createAction(
  '[User] Link user to organization success',
  props<{ user: UserModel; organizations: OrganizationModel[] }>()
);
export const userOrganizationLinkFailed = createAction('[User] Link user to organization failed');

export const userOrganizationUnlink = createAction('[User] Unlink user to organization');
export const userOrganizationUnlinkSuccess = createAction(
  '[User] Unlink user to organization success',
  props<{ user: UserModel; organizations: OrganizationModel[] }>()
);
export const userOrganizationUnlinkFailed = createAction('[User] Unlink user to organization failed');

export const userOrganizationRetrieve = createAction('[User] Retrieve user organization');
export const userOrganizationRetrieveSuccess = createAction(
  '[User] Retrieve user organization success',
  props<{ users: UserModel[] }>()
);
export const userOrganizationRetrieveFailed = createAction('[User] Retrieve user organization failed');
