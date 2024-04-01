import express from 'express';
import { addToCart, getCart, deletCartItem, decrimentCartItem } from '../controllers/cartControllers';

const router = express.Router();


router.get('/find/:id', getCart);
router.post('/', addToCart);
router.delete('/:cartItemId', deletCartItem);
router.post('/quantity:', decrimentCartItem);

export default router;