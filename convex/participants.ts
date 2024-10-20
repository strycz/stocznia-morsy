import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { Id } from './_generated/dataModel';

export const get = query({
  args: {
    byDayId: v.optional(v.id('days')),
  },
  handler: async (ctx, args) => {
    if (args.byDayId) {
      const dateId = args.byDayId as Id<'days'>;
      const participants = await ctx.db
        .query('participants')
        .withIndex('by_day', (q) => q.eq('dayId', dateId))
        .collect();

      return participants.reverse().map((entry) => ({
        ...entry,
        body: entry.name.concat(':O'),
      }));
    }
    const participants = await ctx.db
      .query('participants')
      .order('desc')
      .take(100);
    return participants.reverse().map((entry) => ({
      ...entry,
      body: entry.name.concat('😊'),
    }));
  },
});

export const add = mutation({
  args: { name: v.string(), dayId: v.optional(v.id('days')) },
  handler: async (ctx, { name, dayId }) => {
    if (!dayId) return;
    await ctx.db.insert('participants', { name, dayId, hasPaid: false });
  },
});

export const pay = mutation({
  args: { participantId: v.id('participants') },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.participantId, { hasPaid: true });
  },
});
