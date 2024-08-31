import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;
  let reflector: Reflector;

  beforeEach(() => {
    jwtService = { verifyAsync: jest.fn() } as any;
    reflector = new Reflector();
    authGuard = new AuthGuard(jwtService, reflector);
  });

  it('should return true if the route is public', async () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue(true);

    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as any);

    const result = await authGuard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should throw UnauthorizedException if no token is provided', async () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue(false);

    const context = {
      getContext: () => ({ req: { headers: {} } }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({
      getContext: () => ({ req: { headers: {} } }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as any);

    await expect(authGuard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException if token verification fails', async () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue(false);
    jwtService.verifyAsync = jest
      .fn()
      .mockRejectedValue(new Error('Invalid token'));

    const context = {
      getContext: () => ({
        req: { headers: { authorization: 'Bearer invalid.token' } },
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({
      getContext: () => ({
        req: { headers: { authorization: 'Bearer invalid.token' } },
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as any);

    await expect(authGuard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should return true if token is valid', async () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue(false);
    jwtService.verifyAsync = jest.fn().mockResolvedValue({ sub: 'user-id' });

    const context = {
      getContext: () => ({
        req: { headers: { authorization: 'Bearer valid.token' } },
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({
      getContext: () => ({
        req: { headers: { authorization: 'Bearer valid.token' } },
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as any);

    const result = await authGuard.canActivate(context);
    expect(result).toBe(true);
  });
});
