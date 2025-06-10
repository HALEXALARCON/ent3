import { regularExp } from "../../../config/reggex";



export class loginUserDto {

  constructor(
    public readonly email: string,

    public readonly password: string
  ) { }

  static execute(Object: { [key: string]: any }): [string?, loginUserDto?] {

    const { email, password } = Object;


    if (!email) return ['email is required'];

    if (!password) return ['password is required'];

    if (!regularExp.password.test(password)) return ['format password is invalid'];

    if (!regularExp.email.test(email)) return ['email is invalid'];

    return [
      undefined,
      new loginUserDto(email.trim().toLowerCase(), password.trim()),
    ];
  }
}  