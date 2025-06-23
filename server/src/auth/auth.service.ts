import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private readonly usersService: UsersService
    ) {}

    async registerUser(createUserDto: CreateUserDto) {
        const { email } = createUserDto;

        const user = await this.usersService.findUserByEmail(email);

        if (user) {
            throw new BadRequestException("User with this email already exists");
        }

        return this.usersService.createUser(createUserDto);
    }
}
