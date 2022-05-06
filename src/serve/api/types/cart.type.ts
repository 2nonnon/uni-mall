import { ISku } from "./good.type";

export interface CreateCartDto {
    quantity: number;
    skuId: number;
}
export interface DeleteCartsByIdsDto {
    ids: number[];
}
export interface ICart {
    id: number;
    quantity: number;
    sku: ISku;
}
