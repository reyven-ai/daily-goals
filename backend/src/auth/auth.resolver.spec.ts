import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let prisma: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRoot({
          driver: ApolloDriver,
          autoSchemaFile: true,
          sortSchema: true,
        }),
      ],
      providers: [AuthResolver, PrismaService, JwtService],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should authenticate and return user', async () => {
    const token = 'valid.token';
    const decodedToken = {
      sub: 'user-id',
      name: 'Test User',
      email: 'test@example.com',
    };
    const user = {
      authId: 'user-id',
      email: 'test@example.com',
      name: 'Test User',
    };

    jest.spyOn(jwtService, 'decode').mockReturnValue(decodedToken as any);
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
    jest.spyOn(prisma.user, 'create').mockResolvedValue(user as any);

    const result = await resolver.authUser(
      token,
      'test@example.com',
      'Test User',
    );
    expect(result).toEqual(user);
  });
});
