import { IsEnum, IsString } from "class-validator";

enum AccountAccessEnum {
    admin = "admin",
    support = "support",
    user = "user"
}

export class UpdateUserAccessDto {
    
    @IsString()
    userId: string;
    
    @IsEnum(AccountAccessEnum)
    accountAccess: AccountAccessEnum;
}