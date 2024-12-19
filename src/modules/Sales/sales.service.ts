import { Injectable } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import { CreateSalesDto } from './dto/create-sales.dto';
import { transformDate } from 'src/utils/date/adjust-date';
import { UpdateSaleDto } from './dto/update-sale-status.dto';

@Injectable()
export class SalesService {
    constructor(
        private readonly prisma: ClientService,
    ){}

    async create(salePayload: CreateSalesDto){
        const saleDate = transformDate(salePayload.saleDate)
        const sale = {
            ...salePayload,
            saleDate: saleDate,
            transactionValue: Number(salePayload.transactionValue * 100)
        };
        const seller = await this.prisma.user.findUnique({
            where:{id: sale.userId},
        });

        await this.prisma.sale.create({
            data: {
                userId: sale.userId,
                saleDate: sale.saleDate,
                transactionValue: sale.transactionValue,
                commissionValue: (seller.commission * sale.transactionValue)/100,
                paymentMethod: sale.paymentMethod,
                quantity: sale.quantity
            }
        })
        
        return 'Venda criada com sucesso!'
    }

    async userSales(rows:number, page:number, id:string){
        const [sales, salesCount] = await this.prisma.$transaction([
            this.prisma.sale.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                take: rows,
                skip: (page-1)*rows,
                where:{userId: id},
                select:{
                    saleDate: true,
                    transactionValue: true,
                    commissionValue: true,
                    quantity: true,
                    status: true,
                    paymentMethod: true,
                    clientAddress: true
                }
            }),
            this.prisma.sale.count({
                where:{userId: id}
            })
        ])
        
        return {
            data: sales,
            count: salesCount,
            currentPage: page,
            nextPage: (page+1)>(salesCount/rows)?page:page+1,
            prevPage: (page-1)<0?page:page-1,
            lastPage: Math.ceil(salesCount/rows)
        }
    }

    // async unusedFunction(id:string){
    //     const values = await this.prisma.sale.findMany({
    //         where: {userId: id},
    //         select:{
    //             transactionValue: true,
    //             commissionValue: true,
    //             status: true
    //         }
    //     })

    //     const processedTransaction = values.map(prop=>{
    //         if(prop.status === 'confirmed'){
    //             return Number(prop.transactionValue/100);
    //         }
    //         return 0
    //     }).reduce((partialSum, a) => partialSum + a, 0)

    //     const processedCommission = values.map(prop=>{
    //         if(prop.status === 'confirmed'){
    //             return Number(prop.commissionValue/100);
    //         }
    //         return 0
    //     }).reduce((partialSum, a) => partialSum + a, 0)

    //     return {
    //         totalTransaction: processedTransaction,
    //         totalCommission: processedCommission
    //     }
    // }

    async updateSaleStatus(updateStatusPayload: UpdateSaleDto){
        await this.prisma.sale.update({
            where:{id: updateStatusPayload.saleId},
            data: {status: updateStatusPayload.status}
        })
    }
}