import { Router } from 'express';
import trooperRoutes from './trooper.js';

const routes = new Router();
routes.use('/troopers', trooperRoutes);

export default routes;