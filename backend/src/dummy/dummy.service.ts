import { Injectable, NotFoundException } from '@nestjs/common';
import { Dummy } from './entities/dummy.entity';

@Injectable()
export class DummyService {
  private readonly dummies: Dummy[] = [];

  constructor() {
    const initialDummy = new Dummy();
    initialDummy.id = 1;
    initialDummy.title = 'Welcome to the Real World!';
    initialDummy.description = 'Its time to change your life!';
    this.dummies.push(initialDummy);
  }

  async findAll(): Promise<Dummy[]> {
    return this.dummies;
  }

  findOne(id: number): Dummy {
    const dummy = this.dummies.find((d) => d.id === id);
    if (!dummy) {
      throw new NotFoundException(`Dummy with id ${id} not found`);
    }
    return dummy;
  }
}
