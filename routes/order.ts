import express from 'express';
import { getUserOrders } from '../controllers/orderControllers';

const router = express.Router();


router.get('/:id', getUserOrders);


export default router;