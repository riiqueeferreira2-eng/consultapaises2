import axios from "axios";
import { ICountry } from "../interfaces/ICountry";

export class CountryService {
    private countries: ICountry[] = [];
  
    /**
     * Busca todos os países da API REST Countries e armazena localmente.
     */
    public async fetchAllCountries(): Promise<void> {
      try {
        const response = await axios.get<ICountry[]>(
          'https://restcountries.com/v2/all?fields=name,region,capital,population,flags'
        );
        this.countries = response.data;
      } catch (error) {
        console.error('Erro ao buscar países:', error);
        this.countries = [];
      }
    }
  
    /**
     * Filtra os países com base em um termo de pesquisa (case-insensitive).
     * @param searchTerm  Termo a ser buscado no nome dos países
     * @returns Array de ICountry contendo países cujo nome inclui o termo
     */
    public searchCountriesByName(searchTerm: string): ICountry[] {
      const term = searchTerm.toLowerCase();
  
      return this.countries.filter((country) =>
        country.name.toLowerCase().includes(term)
      );
    }
  
    /**
     * Retorna todos os países armazenados (após o fetch).
     */
    public getAll(): ICountry[] {
      return this.countries;
    }
  }  