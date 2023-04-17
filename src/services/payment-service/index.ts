import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError, unauthorizedError } from '@/errors';

async function verifyTicketEnrollment(ticketId: number, userId: number) {
  const ticket = await ticketRepository.findTicketById(ticketId);

  if (!ticket) {
    throw notFoundError();
  }
  const enrollment = await enrollmentRepository.findId(ticket.enrollmentId);
  if (enrollment.userId !== userId) {
    throw unauthorizedError();
  }
}

async function getPaymentForTicketId(userId: number, ticketId: number) {
  await verifyTicketEnrollment(ticketId, userId);

  const paymentTicket = await paymentRepository.findPaymentByTicketId(ticketId);

  if (!paymentTicket) {
    throw notFoundError();
  }
  return paymentTicket;
}

async function paymentProcess(ticketId: number, userId: number, cardData: CardPaymentParams) {
  await verifyTicketEnrollment(ticketId, userId);
  const ticketPayment = await ticketRepository.findTickeTypeById(ticketId);

  const payData = {
    ticketId,
    value: ticketPayment.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const payment = await paymentRepository.createPayment(ticketId, payData);

  await ticketRepository.ticketProcessforPayment(ticketId);

  return payment;
}

export type CardPaymentParams = {
  issuer: string;
  number: number;
  name: string;
  expiration: Date;
  cvv: number;
};

const paymentService = {
  paymentProcess,
  getPaymentForTicketId,
};
export default paymentService;
