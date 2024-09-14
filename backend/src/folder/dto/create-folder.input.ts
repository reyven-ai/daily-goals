import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFolderInput {
  @Field()
  title: string;
}
