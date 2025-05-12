import express from 'express';

import { errorHandler } from './middlewares/errorHandler';
import itemRoutes from './routes/itemRoutes';

const app = express();

app.use(express.json());

// Routes
app.use('/api/items', itemRoutes); // applies routes to api/items, INITIAL SLASH VERY IMPORTANT

// Global Error Handler (after routes)
app.use(errorHandler);

export default app;
