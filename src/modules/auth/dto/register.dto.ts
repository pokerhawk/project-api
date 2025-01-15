import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak'
    })
    password: string;

    @IsString()
    @MinLength(8, {message: "Must have 8 numbers"})
    @MaxLength(8, {message: "Must have 8 numbers"})
    zipcode: string;

    @IsString()
    number: string;

    @IsString()
    complement?: string;
}
