import { PageQuery } from "src/common/dtos/pagination.dto";
import { StudentSearchQuery } from "./student-search-query.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";
import { Type } from "class-transformer";

export class StudentSearchPageQuery extends PageQuery implements StudentSearchQuery {
  @ApiProperty({ description: "학번", required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  studentNumber?: string;

  @ApiProperty({ description: "이름", required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({ description: "이메일", required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  email?: string;

  @ApiProperty({ description: '전화번호 ("-" 포함)', required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  phone?: string;

  @ApiProperty({ description: "학과 아이디", required: false })
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  departmentId?: number;
}
