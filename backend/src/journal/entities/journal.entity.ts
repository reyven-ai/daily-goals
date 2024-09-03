import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Journal {
  @Field(() => String)
  id: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
