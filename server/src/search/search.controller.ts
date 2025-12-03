import { Controller, Get, Param } from "@nestjs/common";
import { Public } from "src/auth/decorators/public.decorator";
import { SearchService } from "./search.service";

@Controller("shop/search")
@Public()
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get(":searchValue")
    shopSearch(@Param("searchValue") searchValue: string) {
        return this.searchService.shopSearch(searchValue);
    }
}
