import helmet from 'helmet';
import dotenv from 'dotenv';
import filterRoutes from './routes/filterRoutes';
import express, { Request, Response, NextFunction } from 'express';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//************ Middleware ****************/
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//************ Routes *******************/
app.use('/', filterRoutes);

//********** Catch All Route ************/
app.all('*', (_req: Request, res: Response) => {
	res.status(404).send('Route not found.');
});

//************ Error Handling ************/
app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
		console.error("Error: ", err.message);
	err.message === "Validation failed" ? res.status(400).send(`${err.message} Ensure filters are properly stringified JSON.`) :
		res.status(500).send(`Something went wrong: ${err.message}`);
});

//************ Start Server *************/
app.listen(PORT, () => {
	console.log(`Server is running on port:${PORT}`);
});
