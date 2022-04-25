// export interface State {
//     readonly countries: Array<Country>;
// }

import { Country, Holidays } from './country';
import { Account } from './account';

export interface AppState {
  readonly countryList: Country[];
  readonly countryHolidays: Holidays[];
  readonly account:Account;
}
