export class CreatePetDto {
  constructor(
    public readonly petName: string,
    public readonly description: string,
    public readonly image_url: string
  ) { }

  static execute(object: { [key: string]: any }): [string?, CreatePetDto?] {
    const { petName, description, image_url } = object;

    if (!petName) return ['Pet name is required'];
    if (!description) return ['Description is required'];
    if (!image_url) return ['Image URL is required'];

    return [
      undefined,
      new CreatePetDto(
        petName.trim(),
        description.trim(),
        image_url.trim()
      )
    ];
  }
}
