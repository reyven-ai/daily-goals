import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderResolver } from './folder.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { JournalService } from 'src/journal/journal.service';

@Module({
  providers: [
    FolderResolver,
    FolderService,
    PrismaService,
    AuthService,
    UserService,
    JournalService,
  ],
})
export class FolderModule {}
