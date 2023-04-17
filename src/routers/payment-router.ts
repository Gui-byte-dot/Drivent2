import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getPaymentByTicketId, paymentProcess } from '@/controllers/payment-controller';

const paymentRouter = Router();

paymentRouter.get('/', authenticateToken, getPaymentByTicketId);
paymentRouter.post('/process', authenticateToken, paymentProcess);

export { paymentRouter };
