import { randomUUID } from 'crypto';

class Person {
  constructor({ id, name, age, hobbies }) {
    this.id = id || randomUUID();
    this.name = name;
    this.age = age;
    this.hobbies = hobbies;
  }
}

export { Person };
