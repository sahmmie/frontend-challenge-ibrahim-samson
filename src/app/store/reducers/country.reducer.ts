import { Country, Holidays } from 'src/app/core/models/country';

export const ADD_COUNTRY = 'ADD_COUNTRY';
export const ADD_VISITED_COUNTRY = 'ADD_VISITED_COUNTRY';
export const SET_COUNTRY_HOLIDAYS = 'SET_COUNTRY_HOLIDAYS';

export function addCountryReducer(state: Country[] = [], action: any) {
  switch (action.type) {
    case ADD_COUNTRY:
      return [...state, ...action.payload];
    case ADD_VISITED_COUNTRY:
      const index = state.findIndex((country) => country.id === action.payload);
      const newArray = JSON.parse(JSON.stringify(state)); // making a new array
      newArray[index].visited = true; // changing value of the new visited property
      return [...newArray];
    default:
      return state;
  }
}

export function countryHolidayReducer(state: Holidays[] = [], action: any) {
  switch (action.type) {
    case SET_COUNTRY_HOLIDAYS:
      return [...state,...action.payload];
    default:
      return state;
  }
}
