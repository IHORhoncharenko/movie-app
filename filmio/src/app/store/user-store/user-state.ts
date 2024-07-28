export interface UserState {
  requestToken?: string | null;
  sessionID?: string | null;
  accountId?: string | null;
}

export const initialState: UserState = {
  requestToken: null,
  sessionID: null,
  accountId: null,
};
