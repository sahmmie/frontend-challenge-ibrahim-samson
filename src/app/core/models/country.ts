export interface Country {
  name: string;
  id?: string;
  visited: boolean;
  idd: {
    root: string;
    suffixes: string[];
  };
  code: string;
}

export interface Holidays {
  country_code: string;
  date: string;
  local_name: string;
  name: string;
  regions: string[];
  types: string[];
}

