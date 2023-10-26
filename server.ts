import express from 'express';
import authRoute from './src/auth/auth_routes';
const app = express();
const port = 3000;
// import * as dotenv from 'dotenv';
import { corsMiddleware } from './src/utils/cors';
        // dotenv.config();

app.use(express.json());

app.use(corsMiddleware);

app.use(express.static("uploads"));


app.get('/', (req, res) => {
    res.send("Hello World");
});

// app.use('/api/v1/user', userRoute.router)

app.use('/api/v1/auth', authRoute.router)

app.listen(port, () => console.log(`app listing on port ${port}`)); 