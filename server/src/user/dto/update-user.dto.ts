import { PartialType } from "@nestjs/mapped-types";
import { CreateUserAddressDto } from "src/user-address/dto/create-user-address.dto";

export class UpdateUserDto extends PartialType(CreateUserAddressDto) {}
