import { Injectable } from '@nestjs/common';
import { CreateJournalInput } from './dto/create-journal.input';
import { UpdateJournalInput } from './dto/update-journal.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Journal } from './entities/journal.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JournalService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async getJournals(userId: string): Promise<Journal[]> {
    return this.prisma.journal.findMany({
      where: { userId },
    });
  }

  async getJournal(id: string, userId: string): Promise<Journal> {
    const journal = await this.prisma.journal.findUnique({
      where: { id, userId },
    });

    if (!journal) {
      throw new Error('Journal not found or access denied');
    }

    return journal;
  }

  async createJournal(
    input: CreateJournalInput,
    userId: string,
  ): Promise<Journal> {
    const TITLE_MAX_LENGTH = 100;
    const CONTENT_MAX_LENGTH = 5000;

    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new Error(`User with ID ${userId} does not exist`);
    }

    if (input.title.length > TITLE_MAX_LENGTH) {
      throw new Error(`Title cannot exceed ${TITLE_MAX_LENGTH} characters`);
    }

    if (input.content.length > CONTENT_MAX_LENGTH) {
      throw new Error(`Content cannot exceed ${CONTENT_MAX_LENGTH} characters`);
    }

    const newJournal = await this.prisma.journal.create({
      data: {
        title: input.title,
        content: input.content,
        userId: userId,
      },
    });

    return newJournal;
  }

  async updateJournal(
    id: string,
    updateJournalInput: UpdateJournalInput,
  ): Promise<Journal> {
    const TITLE_MAX_LENGTH = 100;
    const CONTENT_MAX_LENGTH = 5000;

    if (
      updateJournalInput.title &&
      updateJournalInput.title.length > TITLE_MAX_LENGTH
    ) {
      throw new Error(`Title cannot exceed ${TITLE_MAX_LENGTH} characters`);
    }

    if (
      updateJournalInput.content &&
      updateJournalInput.content.length > CONTENT_MAX_LENGTH
    ) {
      throw new Error(`Content cannot exceed ${CONTENT_MAX_LENGTH} characters`);
    }

    return this.prisma.journal.update({
      where: { id },
      data: updateJournalInput,
    });
  }

  async removeJournal(id: string): Promise<Journal> {
    return this.prisma.journal.delete({ where: { id } });
  }
}
