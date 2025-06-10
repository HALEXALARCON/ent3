export class LoginPetDto {
  constructor(
    public readonly name: string,
    public readonly species: string
  ) { }

  static execute(object: { [key: string]: any }): [string?, LoginPetDto?] {
    const { name, species } = object;

    if (!name) return ['Name is required'];
    if (!species) return ['Species is required'];

    return [
      undefined,
      new LoginPetDto(name.trim(), species.trim())
    ];
  }
}
