import express from 'express';
import dotenv from 'dotenv';
import { router } from './routes';

dotenv.config();

const server = express();
server.use(express.json());

server.use('/', router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
