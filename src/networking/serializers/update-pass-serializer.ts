class UpdatePassSerializer {
  static deSerialize(data: RawPassword): Password {
    return {
      previousPassword: data.previousPassword,
      newPassword: data.newPassword,
    };
  }

  static serialize(data: Password): RawPassword {
    return {
      previousPassword: data.previousPassword,
      newPassword: data.newPassword,
    };
  }
}

export { UpdatePassSerializer };
