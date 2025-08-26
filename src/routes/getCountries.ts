import {AppError} from '../errors/AppError'
import { Axios } from 'axios'
import { Request, Response} from 'express';
import { ICountry } from '../interfaces/ICountry';
import { Regioes } from '../enums/Regions'
import { app } from '../server'
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

  export {routes};