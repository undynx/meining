class SignInSerializer {
  static deSerialize(data: RawSignIn): SignIn {
    return {
      email: data.email,
      password: data.password,
    };
  }

  static serialize(data: SignIn): RawSignIn {
    return {
      email: data.email,
      password: data.password,
    };
  }
}

export { SignInSerializer };
