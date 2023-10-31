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

app.get('/myimage', function (req, res) {
    return res.sendFile('/a76a05bb-082c-4c2e-b496-5fcf1cd67f7b/profileimage/1698782576549-WhatsApp_Image_2023-10-24_at_1.08.55_AM-removebg-preview.png', { root: 'uploads' });
});

app.listen(port, () => console.log(`app listing on port ${port}`)); 