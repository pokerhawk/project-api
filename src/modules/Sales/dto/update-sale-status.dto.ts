import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator";

export enum SaleStatus {
    confirmed = 'confirmed',
    pending = 'pending',
    denied = 'denied'
}

export class UpdateSaleDto {
    
    @IsString()
    saleId: string;

    @IsEnum(SaleStatus)
    status: SaleStatus;
}