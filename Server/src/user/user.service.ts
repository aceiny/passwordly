import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { jwtPayload } from "src/auth/types/payload.type";
import { Response } from "express";
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  setCookie(token: string, res: Response) {
    res.cookie(process.env.COOKIE_NAME || "jwt", token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 3600000 * 5, // dont forget to update this later
    });
  }

  async create(createUserDto: CreateUserDto) {
    if (await this.findOneByUsername(createUserDto.username))
      throw new ConflictException("Username already exists");
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    const payload: jwtPayload = {
      id: user.id,
    };
    return this.jwtService.sign(payload);
  }
  async login(createUserDto: CreateUserDto) {
    const user = await this.findOneByUsername(createUserDto.username);
    if (!user) throw new ConflictException("Invalid credentials");
    const isMatch = await bcrypt.compare(createUserDto.password, user.password);
    if (!isMatch) throw new ConflictException("Invalid credentials");
    const payload: jwtPayload = {
      id: user.id,
    };
    return this.jwtService.sign(payload);
  }
  async findOne(
    userId: string,
    populate: boolean = false,
  ): Promise<User | null> {
    const relations = populate ? ["passwords"] : [];
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations,
    });
    if (!user) return null;
    user.password = undefined;
    return user;
  }
  async findOneByUsername(
    username: string,
    populate: boolean = false,
  ): Promise<User | null> {
    const relations = populate ? ["passwords"] : [];
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
      relations,
    });
    if (!user) return null;
    user.password = undefined;
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
