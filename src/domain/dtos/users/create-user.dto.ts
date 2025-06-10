import { regularExp } from "../../../config/reggex";



export class RegisterUserDto {

  constructor(

    public readonly name: string,

    public readonly email: string,

    public readonly password: string

  ) { }

  static execute(Object: { [key: string]: any }): [string?, RegisterUserDto?] {

    const { name, email, password } = Object;


    if (!name) return ['Name is Required'];

    if (!email) return ['Email is Required'];

    if (!password) return ['Password is Required'];

    if (!regularExp.password.test(password)) return ['format password is invalid'];

    if (!regularExp.email.test(email)) return ['email is invalid'];

    return [

      undefined,

      new RegisterUserDto(
        name.trim().toLowerCase(),
        email.trim().toLowerCase(),
        password.trim()
      ),
    ];
  }
}  