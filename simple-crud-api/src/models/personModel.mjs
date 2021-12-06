import { randomUUID } from 'crypto';

class Person {
  constructor({ name, age, hobbies }) {
    this.id = randomUUID();
    this.name = name;
    this.age = age;
    this.hobbies = hobbies;
  }
}

export { Person };
