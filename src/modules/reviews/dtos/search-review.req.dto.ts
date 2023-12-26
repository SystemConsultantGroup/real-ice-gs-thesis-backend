import { ApiProperty } from "@nestjs/swagger";
import { Stage, Status } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { PageQuery } from "src/common/dtos/pagination.dto";

export class SearchReviewReqDto extends PageQuery {
  @ApiProperty({ description: "저자명" })
  @IsOptional()
  @IsString()
  author: string;

  @ApiProperty({ description: "학과" })
  @IsOptional()
  @IsString()
  department: string;

  @ApiProperty({ description: "구분" })
  @IsOptional()
  @IsEnum(Stage)
  stage: Stage;

  @ApiProperty({ description: "논문 제목" })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ description: "심사 결과" })
  @IsOptional()
  @IsEnum(Status)
  status: Status;
}
