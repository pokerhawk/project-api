import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "../../prisma/generated/client";

@Injectable()
export class ClientService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    async enableShutDownHooks(app: INestApplication){
        process.on('beforeExit', async () => {
            await app.close();
        })
    }
}