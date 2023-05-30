class UserSerializer {
  static deSerialize(data: RawUser): User {
    return {
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.email,
    };
  }

  static serialize(data: User): RawUser {
    return {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
    };
  }
}

export { UserSerializer };
