import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { DummyService } from './dummy.service';
import { Dummy } from './entities/dummy.entity';

@Resolver(() => Dummy)
export class DummyResolver {
  constructor(private readonly dummyService: DummyService) {}

  @Query(() => [Dummy], {})
  findAll() {
    return this.dummyService.findAll();
  }

  @Query(() => Dummy, { name: 'dummy' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.dummyService.findOne(id);
  }
}
