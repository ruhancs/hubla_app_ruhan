import { Product } from "@prisma/client";

export class ProductEntity implements Product {
    id: number;
    name: string;
    value: number;
    createdAt: Date;
    producerId: number;
}
