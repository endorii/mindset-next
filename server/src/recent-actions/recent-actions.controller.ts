import { Controller, Param, Get } from "@nestjs/common";
import { RecentActionsService } from "./recent-actions.service";

@Controller("recent-actions")
export class RecentActionsController {
    constructor(private readonly recentActionsService: RecentActionsService) {}

    @Get(":userId")
    getActionsFromUser(@Param("userId") userId: string) {
        console.log(userId);

        return this.recentActionsService.getActionsFromUser(userId);
    }
}
