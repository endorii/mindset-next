import { Controller, Get, Req } from "@nestjs/common";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";
import { AdminRecentActionsService } from "./admin-recent-actions.service";

@Controller("admin/recent-actions")
export class AdminRecentActionsController {
    constructor(private readonly adminRecentActionsService: AdminRecentActionsService) {}

    @Get()
    getActionsFromUser(@Req() req: Request & { user: AuthenticatedRequestUser }) {
        return this.adminRecentActionsService.getActionsFromUser(req.user.id);
    }
}
