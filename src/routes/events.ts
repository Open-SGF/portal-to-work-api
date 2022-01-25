import type { FastifyPluginAsync } from 'fastify';
import type { FromSchema } from 'json-schema-to-ts';
import { Event } from '../entities/Event';

const findEventParams = {
    type: 'object',
    properties: {
        eventId: { type: 'number' },
    },
    required: ['eventId'],
} as const;

export const events: FastifyPluginAsync = async (app) => {
    app.get('/', async (req, reply) => {
        const events = await app.orm.manager.find(Event);
        return events;
    });

    app.route<{ Params: FromSchema<typeof findEventParams> }>({
        url: '/:eventId',
        method: 'GET',
        schema: { params: findEventParams },
        handler: async (req, reply) => {
            const eventId = req.params.eventId;
            const event = await app.orm.manager.findOne(Event,eventId);
            return event;
        },
    });
};
