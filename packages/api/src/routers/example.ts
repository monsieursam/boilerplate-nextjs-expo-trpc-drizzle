import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { db } from '@repo/database';
import { schema } from '@repo/database';
import { eq } from 'drizzle-orm';

const { exampleSchema } = schema;

export const exampleRouter = router({
  get: publicProcedure
    .query(async () => {
      const data = await db.select().from(exampleSchema);

      return data;
    }),

  add: publicProcedure
    .input(z.object({
      first_name: z.string(),
      last_name: z.string(),
      email: z.string(),
    }))
    .mutation(async ({ input }) => {
      const data = await db.insert(exampleSchema).values(input).returning();

      return data;
    }),
  remove: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ input }) => {
      const data = await db.delete(exampleSchema).where(
        eq(exampleSchema.id, input.id),
      );

      return data;
    }),
});
