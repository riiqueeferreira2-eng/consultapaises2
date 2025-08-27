import {AppError} from '../errors/AppError'
import { Axios } from 'axios'
import { Request, Response} from 'express';
import { ICountry } from '../interfaces/ICountry';
import { Regioes } from '../enums/Regions'
import axios from 'axios';
import express, {Router} from 'express'

const routes:Router = express.Router();

routes.get('/countries/region/:region', async (req: Request, res: Response) => {
    const region = req.params.region;
  
    if (!Object.values(Regioes).includes(region as Regioes)) {
      throw new AppError('Região inválida.', 400);
    }
  //comentario
    try {
      const response = await axios.get<ICountry[]>(
        `https://restcountries.com/v2/region/${region}?fields=name,region,capital,population,flags`
      );
      const countries = response.data;
      res.status(200).json(countries);
    } catch (error) {
      console.error('Erro ao buscar países por região:', error);
      throw new AppError('Não foi possível buscar os países por região!.', 400);
    }
  });

  routes.get('/countries', async(req: Request, res: Response) => {
      const countries = await fetchAllCountries();
    
      if (countries.length === 0) {
        return res.status(500).json({ error: 'Não foi possível buscar os países.' });
      }
    
      return res.status(200).json(countries);
    });
  
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
  

  export {routes};