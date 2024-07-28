import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "./admin.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { adminSigninDto, adminSignupDto } from "./admin.dtos";
import { jwtPayload } from "src/auth/types/payload.type";
import { Response } from "express";
import { AdminProfile } from "src/admin_profile/admin_profile.entity";
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(AdminProfile)
    private readonly adminProfileRepository: Repository<AdminProfile>,
    private readonly jwtService: JwtService,
  ) {}
  setCookie(token: string, res: Response) {
    res.cookie(process.env.COOKIE_NAME || "jwt", token, {
      httpOnly: false,
      secure: false,
      maxAge: 3600000 * 5, // dont forget to update this later
    });
  }
  async emailExists(email: string) {
    const emailExist = await this.adminRepository.findOne({
      where: { 
        email: email,
      },
    });
    if (emailExist) {
      throw new ConflictException("Email already exists");
    }
    return !!emailExist;
  }
  async userExists(email: string) {
    const user = await this.adminRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new ConflictException("Invalid credentials");
    }
    return user;
  }
  async signinAdmin(adminDto: adminSigninDto, res: Response) {
    const user = await this.userExists(adminDto.email);
    if (!(await bcrypt.compare(adminDto.password, user.password))) {
      throw new ConflictException("Invalid credentials");
    }
    const payload: jwtPayload = {
      id: user.id,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);
    this.setCookie(token, res);
    return {
      message: "Admin signed in successfully",
      status: 201,
    };
  }

  async signupAdmin(adminDto: adminSignupDto, res: Response) {
    await this.emailExists(adminDto.email);
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(adminDto.password, salt);
    let admin: Admin;
    try {
      await this.adminRepository.manager.transaction(
        async (transactionalEntityManager) => {
          admin = this.adminRepository.create({
            ...adminDto,
            password: hashedPassword,
          });
          await transactionalEntityManager.save(admin);
          const adminProfile = this.adminProfileRepository.create({
            ...adminDto,
            admin: admin,
          });
          await transactionalEntityManager.save(adminProfile);
        },
      );
    } catch (err) {
      throw new InternalServerErrorException("Error in creating admin");
    }
    const payload: jwtPayload = {
      id: admin.id,
      role: admin.role,
    };
    const token = this.jwtService.sign(payload);
    this.setCookie(token, res);
    return {
      message: "Admin signed up successfully",
      status: 201,
    };
  }
}
