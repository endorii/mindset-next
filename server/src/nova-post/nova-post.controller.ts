import { Body, Controller, Post } from "@nestjs/common";
import { Public } from "src/auth/decorators/public.decorator";
import { NovaPostService } from "./nova-post.service";

@Controller("nova-post")
export class NovaPostController {
    constructor(private readonly novaPostService: NovaPostService) {}

    @Post("areas")
    @Public()
    getAreas() {
        return this.novaPostService.getAreas();
    }

    @Post("cities")
    @Public()
    getCities(@Body("areaRef") areaRef: string) {
        return this.novaPostService.getCitiesByArea(areaRef);
    }

    @Post("warehouses")
    @Public()
    getWarehouses(@Body("cityRef") cityRef: string) {
        return this.novaPostService.getWarehouses(cityRef);
    }
}
