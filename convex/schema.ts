import { defineSchema, defineTable } from 'convex/server';
import { authTables } from '@convex-dev/auth/server';
import { v } from 'convex/values';

export default defineSchema({
  ...authTables,
  participants: defineTable({
    createdBy: v.optional(v.string()),
    name: v.string(),
    hasPaid: v.boolean(),
    dayId: v.id('days'),
  }).index('by_day', ['dayId']),
  days: defineTable({ date: v.string() }),
});
