import express from 'express';
import { startTest, submitTest } from '../controllers/testController.js';

const router = express.Router();

router.get('/start', startTest);
router.post('/submit', submitTest);

export default router;
