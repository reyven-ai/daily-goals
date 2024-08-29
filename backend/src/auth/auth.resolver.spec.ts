import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            decode: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should return an existing user when found', async () => {
    const token = 'mockToken';
    const decodedToken = {
      sub: '123',
      email: 'test@example.com',
      name: 'Test User',
    };

    const mockUser = {
      id: '1',
      authId: '123',
      email: 'test@example.com',
      name: 'Test User',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(jwtService, 'decode').mockReturnValue(decodedToken);
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

    const result = await resolver.authUser(token);

    expect(jwtService.decode).toHaveBeenCalledWith(token);
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { authId: '123' },
    });
    expect(result).toEqual(mockUser);
  });

  it('should create a new user when not found', async () => {
    const token = 'mockToken';
    const decodedToken = {
      sub: '123',
      email: 'newuser@example.com',
      name: 'New User',
    };

    const newUser = {
      id: '2',
      authId: '123',
      email: 'newuser@example.com',
      name: 'New User',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(jwtService, 'decode').mockReturnValue(decodedToken);
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
    jest.spyOn(prismaService.user, 'create').mockResolvedValue(newUser);

    const result = await resolver.authUser(token);

    expect(jwtService.decode).toHaveBeenCalledWith(token);
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { authId: '123' },
    });
    expect(prismaService.user.create).toHaveBeenCalledWith({
      data: {
        authId: '123',
        email: 'newuser@example.com',
        name: 'New User',
      },
    });
    expect(result).toEqual(newUser);
  });

  it('should throw an error for an invalid token', async () => {
    const token = 'invalidToken';

    jest.spyOn(jwtService, 'decode').mockReturnValue(null);

    await expect(resolver.authUser(token)).rejects.toThrow('Invalid token');
  });
});
