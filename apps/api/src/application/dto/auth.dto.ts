import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters' })
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'Name can only contain letters and spaces',
  })
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100, { message: 'Email must not exceed 100 characters' })
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(50, { message: 'Password must not exceed 50 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d_]+$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and can include underscores',
  })
  password!: string;
}

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100, { message: 'Email must not exceed 100 characters' })
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(50, { message: 'Password must not exceed 50 characters' })
  password!: string;
}
