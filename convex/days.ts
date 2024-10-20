import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { Id } from './_generated/dataModel';

export const getOrCreate = mutation({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    // First, try to find an existing day with the given date
    // return await ctx.db.query('days').first();

    const existingDay = await ctx.db
      .query('days')
      .filter((q) => q.eq(q.field('date'), args.date))
      .first();

    return existingDay !== null
      ? existingDay._id
      : await ctx.db.insert('days', { date: args.date });
  },
});

// export const get = query({
//   args: { date: v.optional(v.string()) },
//   handler: async (ctx, args) => {
//     if (args.date) {
//       // If a date is provided, return the specific day
//       return await ctx.db
//         .query('days')
//         .withIndex('by_date', (q) => q.eq('date', args.date))
//         .first();
//     } else {
//       // If no date is provided, return all days
//       return await ctx.db.query('days').collect();
//     }
//   },
// });
