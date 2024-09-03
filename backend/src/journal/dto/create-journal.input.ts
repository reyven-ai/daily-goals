import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateJournalInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;
}
