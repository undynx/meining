class GetUserSerializer {
  static deSerialize(data: RawComptUser): ComptUser {
    return {
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.email,
    };
  }

  static serialize(data: ComptUser): RawComptUser {
    return {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
    };
  }
}

export { GetUserSerializer };
