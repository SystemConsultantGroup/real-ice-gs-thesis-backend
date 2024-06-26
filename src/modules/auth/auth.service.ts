import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../config/database/prisma.service";
import { LoginRequestDto } from "./dto/login-request.dto";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginRequsetDto: LoginRequestDto) {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        loginId: loginRequsetDto.loginId,
      },
    });

    if (!user || !(await bcrypt.compare(loginRequsetDto.password, user.password))) {
      throw new UnauthorizedException("학번이나 비밀번호가 올바르지 않습니다");
    }

    return this.jwtService.sign({
      loginId: user.loginId,
      type: user.type,
    });
  }

  async loginUser(id: number) {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new BadRequestException("존재하지않는 id입니다");

    return this.jwtService.sign({
      loginId: user.loginId,
      type: user.type,
    });
  }

  createHash(password: string) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }
}
