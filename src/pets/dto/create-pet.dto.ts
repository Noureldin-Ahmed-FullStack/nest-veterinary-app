import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  age!: number;

  @IsString()
  @IsNotEmpty()
  breed!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsOptional()
  @IsString()
  pfp!: string | null;
}
