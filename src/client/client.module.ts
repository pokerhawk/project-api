import { Module } from "@nestjs/common";
import { ClientService } from "./client.service";
import { PrismaClient } from "../../prisma/generated/client";

@Module({
    imports: [PrismaClient],
    providers: [ClientService],
    exports: [ClientService]
})

export class ClientModule{}