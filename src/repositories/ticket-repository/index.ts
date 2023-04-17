import { Ticket, TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

async function findTicketforType() {
  return prisma.ticketType.findMany();
}

async function findTicketById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    },
  });
}
async function findTickeTypeById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true, //inner join
    },
  });
}

async function createTicket(ticket: TicketParams) {
  return prisma.ticket.create({
    data: {
      ...ticket,
    },
  });
}

async function ticketProcessforPayment(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

export type TicketParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

const ticketRepository = {
  findTicketforType,
  findTicketByEnrollmentId,
  createTicket,
  findTicketById,
  findTickeTypeById,
  ticketProcessforPayment,
};

export default ticketRepository;
