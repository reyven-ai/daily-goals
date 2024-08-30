import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/auth.entity';
import { AuthService } from './auth.service';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  @Query(() => [User], { name: 'getAllUsers' })
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users');
    return this.authService.getAllUsers();
  }

  @Mutation(() => User)
  async authUser(
    @Args('token') token: string,
    @Args('email') email: string,
    @Args('name') name: string,
  ): Promise<User> {
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
