import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const get = query({
  args: {
    byDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const participants = await ctx.db
      .query('participants')
      .order('desc')
      .take(100);
    return participants.reverse().map((entry) => ({
      ...entry,
      // Format smileys
      body: entry.name.concat('😊'),
    }));
  },
});

export const add = mutation({
  args: { name: v.string(), dayId: v.id('days') },
  handler: async (ctx, { name, dayId }) => {
    await ctx.db.insert('participants', { name, dayId, hasPaid: false });
  },
});

export const pay = mutation({
  args: { participantId: v.id('participants') },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.participantId, { hasPaid: true });
  },
});
