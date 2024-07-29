export interface UserState {
  requestToken?: string | null;
  sessionID?: string | null;
  accountID?: string | null;
}

export const initialState: UserState = {
  requestToken: null,
  sessionID: null,
  accountID: null,
};
