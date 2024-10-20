import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  messages: defineTable({
    author: v.string(),
    body: v.string(),
  }),
  likes: defineTable({
    liker: v.string(),
    messageId: v.id('messages'),
  }).index('byMessageId', ['messageId']),
  participants: defineTable({
    createdBy: v.optional(v.string()),
    name: v.string(),
    hasPaid: v.boolean(),
    dayId: v.id('days'),
  }).index('by_day', ['dayId']),
  days: defineTable({ date: v.string() }),
});
