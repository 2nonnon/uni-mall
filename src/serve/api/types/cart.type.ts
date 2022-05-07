import { ISku } from "./good.type";

export interface UpdateCartDto {
    quantity: number;
}

export interface CreateCartDto {
    goodId: number;
    goodName: string;
    quantity: number;
    skuId: number;
}
export interface DeleteCartsByIdsDto {
    ids: number[];
}
export interface ICart {
    id: number;
    quantity: number;
    goodId: string;
    goodName: string;
    sku: ISku;
}
