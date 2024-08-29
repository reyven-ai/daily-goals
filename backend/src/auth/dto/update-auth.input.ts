import { CreateAuthInput } from './create-auth.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthInput extends PartialType(CreateAuthInput) {
  @Field(() => Int)
  id: string;

  @Field()
  email?: string;

  @Field()
  name?: string;
}
