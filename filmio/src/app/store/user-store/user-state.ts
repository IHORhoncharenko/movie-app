import { Subscribe } from "../../models/subscribe.models";

export interface UserState {
  requestToken?: string | null;
  sessionID?: string | null;
  accountID?: string | null;
  subscribe?: Subscribe | null;
}

export const initialState: UserState = {
  requestToken: null,
  sessionID: null,
  accountID: null,
  subscribe: null,
};
