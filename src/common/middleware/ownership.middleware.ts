import { FieldMiddleware, MiddlewareContext, NextFn } from "@nestjs/graphql";

export const ownershipMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();

  if (ctx.context.req.user && ctx.source.id !== ctx.context.req.user.id) {
    return null;
  }

  return value;
};
