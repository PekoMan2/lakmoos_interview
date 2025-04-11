import { Router } from 'express';
import { z } from 'zod';
import prisma from '../prisma/client';
import { validateRequest } from '../middlewares/validateRequest';
import { getEventsQuerySchema, eventSchema, updateEventSchema, idParamSchema } from '../schemas/eventSchemas';

const router = Router();

/**
 * GET /events
 * Returns all events
 */
router.get('/', async (req, res) => {
    try {
        const events = await prisma.event.findMany();
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events', details: error instanceof Error ? error.message : error });
    }
});

/**
 * GET /events/search
 * Filter events by name, start date, etc.
 */
router.get(
    '/search',
    validateRequest(getEventsQuerySchema, 'query'),
    async (req, res) => {
      try {
        // Use the validated query data stored in res.locals
        const { name, from, to } = res.locals.validated.query as z.infer<typeof getEventsQuerySchema>;
        const where: any = {};
  
        if (name) {
          where.name = { contains: name, mode: 'insensitive' };
        }
  
        if (from || to) {
          where.from = {};
          if (from) where.from.gte = from;
          if (to) where.from.lte = to;
        }
  
        const events = await prisma.event.findMany({ where });
        res.json(events);
      } catch (error) {
        console.error('Error searching events:', error);
        res.status(500).json({ error: 'Failed to search events', details: error instanceof Error ? error.message : error });
      }
    }
);

/**
 * POST /events
 * Creates a new event
 */
router.post(
    '/',
    validateRequest(eventSchema, 'body'),
    async (req, res) => {
        try {
            const { name, description, from, to } = req.body as z.infer<typeof eventSchema>;

            var fromDate = new Date(from);
            var toDate = new Date(to);
            if (fromDate > toDate) {
                throw res.status(400).json({ error: 'Start date cannot be after end date' });
            }
            
            const createdEvent = await prisma.event.create({
                data: { name, description, from: new Date(from).toISOString(), to: new Date(to).toISOString() },
            });
            res.status(201).json(createdEvent);
        } catch (error) {
            console.error('Error creating event:', error);
            res.status(500).json({ error: 'Failed to create event' });
        }
    }
);

/**
 * PUT /events/:id
 * Updates an existing event
 */
router.put(
    '/:id',
    validateRequest(idParamSchema, 'params'),
    validateRequest(updateEventSchema, 'body'),
    async (req, res) => {
        try {
            const { id } = req.params as unknown as z.infer<typeof idParamSchema>;
            const { name, description, from, to } = req.body as z.infer<typeof updateEventSchema>;

            var fromDate = new Date(from);
            var toDate = new Date(to);
            if (fromDate > toDate) {
                throw res.status(400).json({ error: 'Start date cannot be after end date' });
            }
            
            const updatedEvent = await prisma.event.update({
                where: { id: Number(id) },
                data: { name, description, from: new Date(from).toISOString(), to: new Date(to).toISOString() },
            });
            res.json(updatedEvent);
        } catch (error) {
            console.error(`Error updating event with id ${req.params.id}:`, error);
            res.status(500).json({ error: 'Failed to update event' });
        }
    }
);

/**
 * DELETE /events/:id
 * Deletes an event by id
 */
router.delete(
    '/:id',
    validateRequest(idParamSchema, 'params'),
    async (req, res) => {
        try {
            const { id } = req.params as unknown as z.infer<typeof idParamSchema>;
            await prisma.event.delete({ where: { id: Number(id) } });
            res.status(204).end();
        } catch (error) {
            console.error(`Error deleting event with id ${req.params.id}:`, error);
            res.status(500).json({ error: 'Failed to delete event' });
        }
    }
);

export default router;
