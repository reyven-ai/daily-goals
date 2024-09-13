import { CreateFolderInput } from './create-folder.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFolderInput extends PartialType(CreateFolderInput) {}
