import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreatePasswordDto } from "./dto/create-password.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { jwtPayload } from "src/auth/types/payload.type";
import { InjectRepository } from "@nestjs/typeorm";
import { Password } from "./entities/password.entity";
import { Repository } from "typeorm";
import { UserService } from "src/user/user.service";

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(Password)
    private readonly passwordRepository: Repository<Password>,
    private readonly userService: UserService,
  ) {}
  async create(createPasswordDto: CreatePasswordDto, userId: string) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException("Invalid user");
    const password = this.passwordRepository.create({
      ...createPasswordDto,
      user,
    });
    await this.passwordRepository.save(password);
    password.user = undefined;
    password.password = undefined;
    return password;
  }

  async findAll(userId: string) {
    const passwords = await this.passwordRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
    for (let password of passwords) {
      password.password = undefined;
    }
    return passwords;
  }

  async findOne(id: string, userId: string) {
    const password = await this.passwordRepository.findOne({
      where: {
        id: id,
      },
      relations: ["user"],
    });
    if (password.user.id !== userId)
      throw new NotFoundException("App not found");
    if (!password) throw new NotFoundException("App not found");
    return password;
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    return `This action updates a #${id} password`;
  }

  remove(id: string) {
    return `This action removes a #${id} password`;
  }
}
