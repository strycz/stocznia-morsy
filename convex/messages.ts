import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const list = query({
  args: {
    byDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.byDate) {
      const messages = await ctx.db.query('messages').order('desc').take(100);

      return messages.reverse().map((message) => ({
        ...message,
        // Format smileys
        body: `${message.body} '😊' byDate`,
      }));
    }
    // Grab the most recent messages.
    const messages = await ctx.db.query('messages').order('desc').take(100);
    // Reverse the list so that it's in a chronological order.
    return messages.reverse().map((message) => ({
      ...message,
      // Format smileys
      body: message.body.replaceAll(':)', '😊'),
    }));
  },
});

export const send = mutation({
  args: { body: v.string(), author: v.string() },
  handler: async (ctx, { body, author }) => {
    // Send a new message.
    await ctx.db.insert('messages', { body, author });
  },
});

export const like = mutation({
  args: { liker: v.string(), messageId: v.id('messages') },
  handler: async (ctx, args) => {
    await ctx.db.insert('likes', {
      liker: args.liker,
      messageId: args.messageId,
    });
  },
});
