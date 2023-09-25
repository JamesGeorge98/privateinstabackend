import express from 'express';
import userRoute from './src/insta_users/insta_user_routes';
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/api/v1/user', userRoute.router)

app.listen(port, () => console.log(`app listing on port ${port}`)); 