jest.mock('../src/prisma/client', () => ({
    __esModule: true,
    default: {
        event: {
            findMany: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    },
}));

import request from 'supertest';
import app from '../src/app';
import prisma from '../src/prisma/client';

const mockPrisma = prisma as unknown as {
    event: {
        findMany: jest.Mock;
        create: jest.Mock;
        update: jest.Mock;
        delete: jest.Mock;
    };
};

describe('Events API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /events', () => {
        it('should return a list of events based on query filter', async () => {
            const fakeEvents = [
                {
                    id: 1,
                    name: 'Test Event',
                    description: 'A test event',
                    from: new Date('2025-04-01T10:00:00.000Z'),
                    to: new Date('2025-04-01T12:00:00.000Z'),
                },
            ];
            mockPrisma.event.findMany.mockResolvedValue(fakeEvents);

            const response = await request(app)
                .get('/events/search')
                .query({ name: 'Test' });
            
            const expectedEvents = fakeEvents.map(event => ({
                ...event,
                from: event.from.toISOString(),
                to: event.to.toISOString(),
            }));

            expect(response.status).toBe(200);
            expect(response.body).toEqual(expectedEvents);
        });

        it('should return validation error for invalid date in query', async () => {
            const response = await request(app)
                .get('/events/search')
                .query({ from: 'invalid-date' });
            
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('errors');
        });
    });

    describe('POST /events', () => {
        it('should create a new event', async () => {
            const newEventInput = {
                name: 'New Event',
                description: 'New Event Description',
                from: "2025-04-01T10:00:00Z",
                to: "2025-04-01T12:00:00Z"
            };

            const createdEvent = {
                id: 123,
                name: newEventInput.name,
                description: newEventInput.description,
                from: new Date(newEventInput.from),
                to: new Date(newEventInput.to),
            };

            mockPrisma.event.create.mockResolvedValue(createdEvent);

            const response = await request(app)
                .post('/events')
                .send(newEventInput);

            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                ...createdEvent,
                from: createdEvent.from.toISOString(),
                to: createdEvent.to.toISOString(),
            });
        });

        it('should return validation error when required fields are missing', async () => {
            const invalidEvent = {
                description: 'Missing name',
                from: "2025-04-01T10:00:00Z",
                to: "2025-04-01T12:00:00Z"
            };

            const response = await request(app)
                .post('/events')
                .send(invalidEvent);
            
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('errors');
        });
    });

    describe('PUT /events/:id', () => {
        it('should update an existing event', async () => {
            const updateData = {
                name: 'Updated Event',
                description: 'Updated description',
                from: "2025-04-01T11:00:00Z",
                to: "2025-04-01T13:00:00Z"
            };

            const updatedEvent = {
                id: 1,
                name: updateData.name,
                description: updateData.description,
                from: new Date(updateData.from),
                to: new Date(updateData.to),
            };

            mockPrisma.event.update.mockResolvedValue(updatedEvent);

            const response = await request(app)
                .put('/events/1')
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                ...updatedEvent,
                from: updatedEvent.from.toISOString(),
                to: updatedEvent.to.toISOString(),
            });
        });

        it('should return validation error for invalid id parameter', async () => {
            const updateData = {
                name: 'Updated Event',
                description: 'Updated description',
                from: "2025-04-01T11:00:00Z",
                to: "2025-04-01T13:00:00Z"
            };

            const response = await request(app)
                .put('/events/abc') // invalid id (non-numeric)
                .send(updateData);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('errors');
        });
    });

    describe('DELETE /events/:id', () => {
        it('should delete an event and return 204', async () => {
            mockPrisma.event.delete.mockResolvedValue({
                id: 1,
                name: 'Test',
                description: 'Test description',
                from: new Date(),
                to: new Date(),
            });
            
            const response = await request(app)
                .delete('/events/1');

            expect(response.status).toBe(204);
        });

        it('should return validation error for invalid id parameter', async () => {
            const response = await request(app)
                .delete('/events/invalid');

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('errors');
        });
    });
});
