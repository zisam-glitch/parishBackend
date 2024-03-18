import express from 'express';
import { createProducts, getAllProducts, searchProducts, getProducts} from '../controllers/productControllers';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProducts);
router.get('/search/:key', searchProducts);
router.post('/', createProducts);

export default router;