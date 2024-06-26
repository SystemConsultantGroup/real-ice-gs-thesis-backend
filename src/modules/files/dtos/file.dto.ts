import { ApiProperty } from "@nestjs/swagger";
import { File } from "@prisma/client";
import { IsUUID } from "class-validator";

export class FileDto {
  constructor(fileData: File) {
    this.uuid = fileData.uuid;
    this.name = fileData.name;
    this.mimeType = fileData.mimeType;
    this.createdAt = fileData.createdAt;
    this.updatedAt = fileData.updatedAt;
  }

  @ApiProperty({ description: "파일 uuid", example: "11111111-1111-1111-1111-1111111111" })
  @IsUUID()
  uuid: string;

  @ApiProperty({ description: "파일 이름" })
  name: string;

  @ApiProperty({ description: "파일 타입" })
  mimeType: string;

  @ApiProperty({ description: "생성일" })
  createdAt: Date;

  @ApiProperty({ description: "수정일" })
  updatedAt: Date;
}
