export class User {
  id;
  email;

  constructor(id, email) {
    this.id = id;
    this.email = email;
  }

  pojo() {
    return {
      id: this.id,
      email: this.email,
    };
  }
}
