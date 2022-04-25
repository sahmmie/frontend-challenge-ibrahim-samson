import { Account } from 'src/app/core/models/account';

export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';

export function addAccountReducer(state: Account[] = [], action: any) {
  switch (action.type) {
    case ADD_ACCOUNT:
      return action.payload;
    case REMOVE_ACCOUNT:
      return null;
    default:
      return state;
  }
}
