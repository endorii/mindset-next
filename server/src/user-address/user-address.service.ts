import { Injectable } from "@nestjs/common";
import { CreateUserAddressDto } from "./dto/create-user-address.dto";
import { UpdateUserAddressDto } from "./dto/update-user-address.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserAddressService {
    constructor(private readonly prisma: PrismaService) {}
    create(createUserAddressDto: CreateUserAddressDto) {
        return "This action adds a new userAddress";
    }

    findAll() {
        return `This action returns all userAddress`;
    }

    findOne(id: number) {
        return `This action returns a #${id} userAddress`;
    }

    update(id: number, updateUserAddressDto: UpdateUserAddressDto) {
        return `This action updates a #${id} userAddress`;
    }

    remove(id: number) {
        return `This action removes a #${id} userAddress`;
    }
}
