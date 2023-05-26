class SignUpSerializer {
  static deSerialize(data: RawSignUp): SignUp {
    return {
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.email,
      password: data.password,
    };
  }

  static serialize(data: SignUp): RawSignUp {
    return {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      password: data.password,
    };
  }
}

export { SignUpSerializer };
