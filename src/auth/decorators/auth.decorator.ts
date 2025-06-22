import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Authentication = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const { auth } = request;

    return data ? auth?.[data] : auth;
  },
);
