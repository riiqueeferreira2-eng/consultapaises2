import axios from "axios";
import { ICountry } from "../interfaces/ICountry";

async function searchCountriesByName(searchTerm: string): Promise<ICountry[]> {
    try {
      const response = await axios.get<ICountry[]>(
        'https://restcountries.com/v2/all?fields=name,region,capital,population,flags'
      );
  
      const countries = response.data;
  
      const filtered = countries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      return filtered;
    } catch (error) {
      console.error('Erro ao buscar países:', error);
      return [];
    }
  }

  async function fetchAllCountries(): Promise<ICountry[]> {
    try {
      const response = await axios.get<ICountry[]>(
        'https://restcountries.com/v2/all?fields=name,region,capital,population,flags'
      );
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar países:', error);
      return []; // Retorna array vazio em caso de erro
    }
  }
  

  
  