import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Dummy {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;
}
