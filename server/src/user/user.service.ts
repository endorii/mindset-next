import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcryptjs";
import { plainToClass } from "class-transformer";
import { Role } from "./enum/role.enum";
// import { EmailService } from 'src/email/email.service';
import { ChangePasswordDto } from "./dto/change-password.dto";
import { UserResponseDto } from "./dto/user-response.dto.";
import { User } from "generated/prisma";

export const roundsOfHashing = 10;

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
        // private readonly emailService: EmailService,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, roundsOfHashing);
        createUserDto.password = hashedPassword;
        createUserDto.role = Role.User;

        // await this.emailService.sendEmail(
        //   createUserDto.email,
        //   'Welcome. Your Journey Starts Here.',
        //   'register.html',
        //   {},
        // );

        return plainToClass(UserResponseDto, this.prisma.user.create({ data: createUserDto }));
    }

    async findOne(id: string): Promise<UserResponseDto> {
        const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });
        return plainToClass(UserResponseDto, user);
    }

    async update(id: string, updateUserDto: UpdateUserDto, user: User): Promise<UserResponseDto> {
        const isValidRole = (role: string): role is Role => {
            return Object.values(Role).includes(role as Role);
        };

        if (!isValidRole(user.role)) {
            throw new BadRequestException("Invalid user role");
        }

        if (user.role === Role.User) {
            if (user.id !== id) {
                throw new BadRequestException("Users can only update their own profile");
            }

            const userUpdated = await this.prisma.user.update({
                where: { id: user.id },
                data: updateUserDto,
            });

            return plainToClass(UserResponseDto, userUpdated);
        }

        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, roundsOfHashing);
        }

        return plainToClass(
            UserResponseDto,
            this.prisma.user.update({
                where: { id },
                data: updateUserDto,
            })
        );
    }

    async changePassword(
        changePasswordDto: ChangePasswordDto,
        user: User
    ): Promise<UserResponseDto> {
        const { password, newPassword } = changePasswordDto;
        const getUser = await this.prisma.user.findUniqueOrThrow({ where: { email: user.email } });

        const isPasswordValid = await bcrypt.compare(password, getUser.password);

        if (!isPasswordValid) {
            throw new BadRequestException("Your current password is incorrect.");
        }

        const hashedPassword = await bcrypt.hash(newPassword, roundsOfHashing);
        return plainToClass(
            UserResponseDto,
            this.prisma.user.update({
                where: { id: getUser.id },
                data: {
                    password: hashedPassword,
                },
            })
        );
    }
}
