import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Auth } from './entities/auth.entity';

@Resolver(() => Auth)
export class AuthResolver {
  authService: any;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  @Query(() => [Auth], { name: 'getAllUsers' })
  async getAllUsers(): Promise<Auth[]> {
    console.log('Fetching all users');
    return this.authService.getAllUsers();
  }

  @Mutation(() => Auth)
  async authUser(
    @Args('token') token: string,
    @Args('email') email: string,
    @Args('name') name: string,
  ): Promise<Auth> {
    try {
      const decodedToken = this.jwtService.decode(token) as {
        sub: string;
        name: string;
        email: string;
      };

      console.log('Decoded Token:', decodedToken);

      if (!decodedToken) {
        throw new Error('Invalid token');
      }

      const { sub: authId } = decodedToken;

      const userEmail = email || decodedToken.email;
      const fullName = name || decodedToken.name;

      let user = await this.prisma.user.findUnique({ where: { authId } });

      if (!user) {
        console.log('User not found, creating new user');
        user = await this.prisma.user.create({
          data: {
            authId,
            email: userEmail,
            name: fullName,
          },
        });
      }
      return user;
    } catch (error) {
      console.error('Authentication failed:', error.message);
      throw new Error('Authentication failed');
    }
  }
}
