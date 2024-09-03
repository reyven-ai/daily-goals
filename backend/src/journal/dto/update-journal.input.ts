import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateJournalInput {
  @Field({ nullable: true })
  id?: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;
}
