import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { MonoPayService } from "./mono-pay.service";
import { CreateMonoPayDto } from "./dto/create-mono-pay.dto";
import { UpdateMonoPayDto } from "./dto/update-mono-pay.dto";

@Controller("mono-pay")
export class MonoPayController {
    constructor(private readonly monoPayService: MonoPayService) {}

    @Post()
    create(@Body() createMonoPayDto: CreateMonoPayDto) {
        return this.monoPayService.create(createMonoPayDto);
    }

    @Get()
    findAll() {
        return this.monoPayService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.monoPayService.findOne(+id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateMonoPayDto: UpdateMonoPayDto) {
        return this.monoPayService.update(+id, updateMonoPayDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.monoPayService.remove(+id);
    }
}
