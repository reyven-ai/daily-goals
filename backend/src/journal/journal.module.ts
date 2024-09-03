import { Module } from '@nestjs/common';
import { JournalService } from './journal.service';
import { JournalResolver } from './journal.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [
    JournalResolver,
    JournalService,
    PrismaService,
    AuthService,
    UserService,
  ],
})
export class JournalModule {}
