import { Injectable } from '@nestjs/common';
import { CreateFolderInput } from './dto/create-folder.input';
import { UpdateFolderInput } from './dto/update-folder.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Folder } from './entities/folder.entity';

@Injectable()
export class FolderService {
  constructor(private readonly prisma: PrismaService) {}

  async getFolders(userId: string): Promise<Folder[]> {
    return this.prisma.folder.findMany({
      where: { userId },
    });
  }

  async getFolder(id: string, userId: string): Promise<Folder> {
    const folder = await this.prisma.folder.findUnique({
      where: { id, userId },
      include: { journals: true } as any,
    });

    if (!folder) {
      throw new Error('Folder not found or access denied');
    }

    return folder;
  }

  async createFolder(
    input: CreateFolderInput,
    userId: string,
  ): Promise<Folder> {
    const TITLE_MAX_LENGTH = 50;

    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new Error(`User with ID ${userId} does not exist`);
    }

    if (input.title.length > TITLE_MAX_LENGTH) {
      throw new Error(`Title cannot exceed ${TITLE_MAX_LENGTH} characters`);
    }

    const newFolder = await this.prisma.folder.create({
      data: {
        title: input.title,
        userId: userId,
      },
    });

    return newFolder;
  }

  async updateFolder(
    id: string,
    updateFolderInput: UpdateFolderInput,
  ): Promise<Folder> {
    const TITLE_MAX_LENGTH = 50;

    if (
      updateFolderInput.title &&
      updateFolderInput.title.length > TITLE_MAX_LENGTH
    ) {
      throw new Error(`Title cannot exceed ${TITLE_MAX_LENGTH} characters`);
    }

    return this.prisma.folder.update({
      where: { id },
      data: updateFolderInput,
    });
  }

  async removeFolder(id: string): Promise<Folder> {
    return this.prisma.folder.delete({ where: { id } });
  }
}