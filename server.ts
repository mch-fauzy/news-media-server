import express from 'express';
import cors from 'cors';
import { router } from './routes';

const server = express();
server.use(cors());
server.use(express.json());

server.use('/', router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
