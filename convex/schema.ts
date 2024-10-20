import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  participants: defineTable({
    createdBy: v.optional(v.string()),
    name: v.string(),
    hasPaid: v.boolean(),
    dayId: v.id('days'),
  }).index('by_day', ['dayId']),
  days: defineTable({ date: v.string() }),
});
