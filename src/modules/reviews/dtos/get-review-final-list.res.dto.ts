import { ApiProperty } from "@nestjs/swagger";
import { Status, Stage, Role } from "@prisma/client";
import { ReviewDto } from "./review.dto";
import { SearchStatus } from "./search-review.req.dto";
import { ProcessDto } from "./process.dto";

export class GetReviewFinalListResDto {
  constructor(review: ReviewDto, process: ProcessDto) {
    this.id = review.id;
    this.student = review.thesisInfo.process.student.name;
    this.department = review.thesisInfo.process.student.department.name;
    this.stage = review.thesisInfo.stage;
    this.title = review.thesisInfo.title;
    this.reviewerRoles = process.reviewers
      .filter((reviewer) => {
        if (reviewer.reviewerId === review.reviewer.id) return reviewer;
      })
      .map((reviewerRole) => reviewerRole.role);
    if (review.contentStatus == Status.PASS || review.contentStatus == Status.FAIL) {
      this.status = SearchStatus.COMPLETE;
    } else {
      this.status = SearchStatus.PENDING;
    }
  }

  @ApiProperty({ description: "논문심사 아이디" })
  id: number;
  @ApiProperty({ description: "논문 저자 (학생)" })
  student: string;
  @ApiProperty({ description: "학과명" })
  department: string;
  @ApiProperty({ description: "심사단계 (구분)", enum: Stage })
  stage: Stage;
  @ApiProperty({ description: "논문 제목" })
  title: string;
  @ApiProperty({ description: "심사위원 타입" })
  reviewerRoles: Role[];
  @ApiProperty({ description: "심사 현황", enum: SearchStatus })
  status: SearchStatus;
}
