import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createTicket, getTicketTypes, getTickets } from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter.get('/types', authenticateToken, getTicketTypes);
ticketsRouter.get('', authenticateToken, getTickets);
ticketsRouter.post('', authenticateToken, createTicket);

export { ticketsRouter };
