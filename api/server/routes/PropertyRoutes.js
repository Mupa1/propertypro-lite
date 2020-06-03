import { Router } from 'express';
import PropertyController from '../controllers/PropertyController';

const router = Router();

router.get('/properties/', PropertyController.getAllProperties);
router.post('/properties/', PropertyController.addProperty);
router.get('/properties/:id', PropertyController.getAProperty);
router.put('/properties/:id', PropertyController.updateProperty);
router.delete('/properties/:id', PropertyController.deleteProperty);

export default router;
