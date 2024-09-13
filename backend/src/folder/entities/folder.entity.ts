import { ObjectType, Field } from '@nestjs/graphql';
import { Journal } from '../../journal/entities/journal.entity';

@ObjectType()
export class Folder {
  @Field(() => String)
  id: string;

  @Field()
  userId: string;

  @Field()
  title: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Journal], { nullable: true })
  journals?: Journal[];
}
