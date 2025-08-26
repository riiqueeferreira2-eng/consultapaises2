export interface ICountry {
    name: string;
    region: string;
    capital: string;
    population: number;
    flags: {
      png: string;
      svg: string;
    };
  }