import { Injectable } from "@nestjs/common";
import { CreateMonoPayDto } from "./dto/create-mono-pay.dto";
import { UpdateMonoPayDto } from "./dto/update-mono-pay.dto";

@Injectable()
export class MonoPayService {
    create(createMonoPayDto: CreateMonoPayDto) {
        return "This action adds a new monoPay";
    }

    findAll() {
        return `This action returns all monoPay`;
    }

    findOne(id: number) {
        return `This action returns a #${id} monoPay`;
    }

    update(id: number, updateMonoPayDto: UpdateMonoPayDto) {
        return `This action updates a #${id} monoPay`;
    }

    remove(id: number) {
        return `This action removes a #${id} monoPay`;
    }
}
