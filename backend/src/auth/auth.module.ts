import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthGuard } from './guard/auth.guard';
import { jwtConstants } from './constants/constants';

@Global()
@Module({
  imports: [
    JwtModule.register({
      publicKey: jwtConstants.public,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthResolver, AuthService, PrismaService, AuthGuard],
  exports: [JwtModule, AuthGuard],
})
export class AuthModule {}
