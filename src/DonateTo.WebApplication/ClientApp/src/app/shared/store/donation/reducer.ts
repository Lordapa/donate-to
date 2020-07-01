import * as donationRequestActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { DonationRequestModel, PageModel } from '../../models';
import { DonationModel } from '../../models/donation.model';

export interface DonationRequestState {
  loading: boolean;
  failed: boolean;
  item: DonationRequestModel;
  currentDonation: DonationModel;
  newDonationLoading: boolean;
  donations: PageModel<DonationModel>;
}

const INITIAL_STATE: DonationRequestState = {
  loading: true,
  failed: false,
  item: new DonationRequestModel(),
  donations: new PageModel<DonationModel>(),
  newDonationLoading: false,
  currentDonation: new DonationModel(),
};

const donationRequestReducer = createReducer(
  INITIAL_STATE,
  on(donationRequestActions.loadDonationRequest, (state) => ({
    ...state,
    loading: true,
    failed: false,
    item: new DonationRequestModel(),
  })),
  on(donationRequestActions.loadDonationRequestSuccess, (state, { donationRequest }) => ({
    ...state,
    loading: false,
    failed: false,
    item: donationRequest,
  })),
  on(donationRequestActions.loadDonationRequestFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  })),
  on(donationRequestActions.loadDonationById, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(donationRequestActions.addDonation, (state) => ({
    ...state,
    loading: true,
    failed: false,
    newDonationLoading: true,
  })),
  on(donationRequestActions.updateDonation, (state) => ({
    ...state,
    loading: true,
    failed: false,
    newDonationLoading: true,
  })),
  on(donationRequestActions.addDonationSuccess, (state, { newDonation }) => ({
    ...state,
    loading: false,
    failed: false,
    newDonationLoading: false,
  })),
  on(donationRequestActions.loadDonationByIdSuccess, (state, { donation }) => ({
    ...state,
    loading: false,
    failed: false,
    currentDonation: donation,
  })),
  on(donationRequestActions.updateDonation, (state, { donation }) => ({
    ...state,
    loading: false,
    failed: false,
    newDonationLoading: false,
  })),
  on(donationRequestActions.addDonationFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  })),
  on(donationRequestActions.loadDonationByIdFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  })),
  on(donationRequestActions.updateDonationFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  })),
  on(donationRequestActions.loadDonationByUserPaged, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(donationRequestActions.loadDonationByUserPagedSuccess, (state, { donations }) => ({
    ...state,
    loading: false,
    failed: false,
    donations,
  })),
  on(donationRequestActions.loadDonationByUserPagedFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    items: new PageModel<DonationModel>(),
  }))
);

export function reducer(state: DonationRequestState, action: Action) {
  return donationRequestReducer(state, action);
}
