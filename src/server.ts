import express, { Express, Request, Response, NextFunction, ErrorRequestHandler} from 'express';
import cors from 'cors';
import { loggerMiddleware } from './middleware/loggerMiddleware';
import { AppError } from './errors/AppError';
import { errorHandler } from './middleware/errorHandler';
import { routes } from './routes/getCountries'

export const app:Express = express();
const port: number = 3000;

app.use(loggerMiddleware)
app.use(express.json());
app.use(cors());
app.use(routes)
app.use(errorHandler)
	
app.listen(port, () => {
    console.log("Api iniciada na porta: " + port);
});