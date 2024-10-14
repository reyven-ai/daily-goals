import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { FolderService } from './folder.service';
import { Folder } from './entities/folder.entity';
import { CreateFolderInput } from './dto/create-folder.input';
import { UpdateFolderInput } from './dto/update-folder.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JournalService } from 'src/journal/journal.service';

@Resolver(() => Folder)
export class FolderResolver {
  constructor(
    private readonly folderService: FolderService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly journalService: JournalService,
  ) {}

  @Query(() => [Folder])
  async searchFolders(
    @Args('searchQuery') searchQuery: string,
    @Context() context,
  ): Promise<Folder[]> {
    const authId = context.req.user.sub;
    const user = await this.userService.getUserByAuthId(authId);

    if (!user) {
      throw new Error('User not found');
    }

    return this.folderService.searchFolders(user.id, searchQuery);
  }

  @Query(() => [Folder])
  async getFolders(@Context() context): Promise<Folder[]> {
    const authId = context.req.user.sub;
    const user = await this.userService.getUserByAuthId(authId);

    if (!user) {
      throw new Error('User not found');
    }

    return this.folderService.getFolders(user.id);
  }

  @Query(() => Folder, { nullable: true })
  async getFolder(
    @Args('id') id: string,
    @Context() context,
  ): Promise<Folder | null> {
    const authId = context.req.user.sub;

    const user = await this.userService.getUserByAuthId(authId);

    if (!user) {
      throw new Error('User not found');
    }

    return this.folderService.getFolder(id, user.id);
  }

  @ResolveField()
  async journals(@Parent() folder: Folder) {
    const { id } = folder;
    return this.journalService.getJournalsByFolderId(id);
  }

  @Mutation(() => Folder)
  async createFolder(
    @Args('input') input: CreateFolderInput,
    @Context() context,
  ): Promise<Folder> {
    const authId = context.req.user.sub;
    const user = await this.prisma.user.findUnique({ where: { authId } });
    if (!user) {
      throw new Error('User not found');
    }
    const userId = user.id;
    return this.folderService.createFolder(input, userId);
  }

  @Mutation(() => Folder)
  async updateFolder(
    @Args('id') id: string,
    @Args('input') input: UpdateFolderInput,
    @Context() context,
  ): Promise<Folder> {
    const authId = context.req.user.sub;
    const user = await this.prisma.user.findUnique({ where: { authId } });
    if (!user) {
      throw new Error('User not found');
    }
    const userId = user.id;

    const folder = await this.prisma.folder.findUnique({ where: { id } });
    if (!folder || folder.userId !== userId) {
      throw new Error('Folder not found or not authorized');
    }

    return this.folderService.updateFolder(id, input);
  }

  @Mutation(() => Boolean)
  async removeFolder(
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

      const folder = await this.prisma.folder.findUnique({ where: { id } });
      if (!folder || folder.userId !== userId) {
        throw new Error('Folder not found or not authorized');
      }

      await this.folderService.removeFolder(id);
      return true;
    } catch (error) {
      console.error('Error removing folder:', error.message);
      throw new Error('Error removing folder');
    }
  }
}
