class UpdateSerializer {
  static deSerialize(data: RawUser): User {
    return {
      firstName: data.firstname,
      lastName: data.lastname,
    };
  }

  static serialize(data: User): RawUser {
    return {
      firstname: data.firstName,
      lastname: data.lastName,
    };
  }
}

export { UpdateSerializer };
