import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { JournalService } from './journal.service';
import { Journal } from './entities/journal.entity';
import { CreateJournalInput } from './dto/create-journal.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateJournalInput } from './dto/update-journal.input';
import { UserService } from '../user/user.service';

@Resolver(() => Journal)
export class JournalResolver {
  constructor(
    private readonly journalService: JournalService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [Journal], { nullable: true })
  async getJournals(@Context() context): Promise<Journal[]> {
    const authId = context.req.user.sub;

    const user = await this.userService.getUserByAuthId(authId);

    if (!user) {
      throw new Error('User not found');
    }

    return this.journalService.getJournals(user.id);
  }

  @Query(() => Journal, { nullable: true })
  async getJournal(
    @Args('id') id: string,
    @Context() context,
  ): Promise<Journal> {
    const authId = context.req.user.sub;

    const user = await this.userService.getUserByAuthId(authId);

    if (!user) {
      throw new Error('User not found');
    }

    return this.journalService.getJournal(id, user.id);
  }

  @Mutation(() => Journal)
  async createJournal(
    @Args('input') input: CreateJournalInput,
    @Context() context,
  ): Promise<Journal> {
    const authId = context.req.user.sub;
    const user = await this.prisma.user.findUnique({ where: { authId } });
    if (!user) {
      throw new Error('User not found');
    }
    const userId = user.id;
    return this.journalService.createJournal(input, userId);
  }

  @Mutation(() => Journal)
  async updateJournal(
    @Args('id') id: string,
    @Args('input') input: UpdateJournalInput,
    @Context() context,
  ): Promise<Journal> {
    const authId = context.req.user.sub;
    const user = await this.prisma.user.findUnique({ where: { authId } });
    if (!user) {
      throw new Error('User not found');
    }
    const userId = user.id;

    const journal = await this.prisma.journal.findUnique({ where: { id } });
    if (!journal || journal.userId !== userId) {
      throw new Error('Journal not found or not authorized');
    }

    return this.journalService.updateJournal(id, input);
  }

  @Mutation(() => Boolean)
  async removeJournal(
    @Args('id') id: string,
    @Context() context,
  ): Promise<boolean> {
    const authId = context.req.user.sub;
    try {
      const user = await this.prisma.user.findUnique({ where: { authId } });
      if (!user) {
        throw new Error('User not found');
      }
      const userId = user.id;

      const journal = await this.prisma.journal.findUnique({ where: { id } });
      if (!journal || journal.userId !== userId) {
        throw new Error('Journal not found or not authorized');
      }

      await this.journalService.removeJournal(id);
      return true;
    } catch (error) {
      console.error('Error removing journal:', error.message);
      throw new Error('Error removing journal');
    }
  }
}
