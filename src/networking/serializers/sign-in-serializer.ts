class SignInSerializer {
  static deSerialize(data: RawSignIn): SignIn {
    return {
      email: data.email,
      password: data.password,
      token: data.token,
      firstName: data.firstname,
      lastName: data.lastname,
    };
  }

  static serialize(data: SignIn): RawSignIn {
    return {
      email: data.email,
      password: data.password,
      token: data.token,
      firstname: data.firstName,
      lastname: data.lastName,
    };
  }
}

export { SignInSerializer };
