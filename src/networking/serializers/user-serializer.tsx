class UserSerializer {
  static deSerialize(data: RawUser): User {
    return {
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.email,
      token: data.token,
      password: data.password,
    };
  }

  static serialize(data: User): RawUser {
    return {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      token: data.token,
      password: data.password,
    };
  }
}

export { UserSerializer };
