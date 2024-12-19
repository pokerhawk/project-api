import { IsBoolean, IsNumber, IsObject, IsString } from "class-validator";

type ClientAddressProps = {
    name: string;
    phone: string;
    zipcode: string;
    address: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    complement: string;
    deliveryDate: Date;
}

export class CreateSalesDto {
    
    @IsString()
    userId: string;

    @IsString()
    saleDate: string;
    
    @IsNumber()
    transactionValue: number;

    @IsString()
    paymentMethod: string;

    @IsNumber()
    quantity: number;

    @IsBoolean()
    commissionOption: boolean;

    @IsObject()
    clientAddress: ClientAddressProps;
}