import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateJournalInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;
}
