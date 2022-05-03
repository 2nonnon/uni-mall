import { IAttribute, IAttributes } from './attribute.type'
import { ICategory } from './category.type'

export interface ISku {
    id: number;
    name: string;
    img_url: string;
    market_price: number;
    price: number;
    sold: number;
    stock: number;
    attributes: IAttribute[];
}
export interface IGood {
    id: string;
    code: string;
    hasSku: boolean;
    cover_url: string;
    market_price: number;
    price: number;
    name: string;
    tag: number;
    total_stock: number;
    sold: number;
    sale_time: string;
    categories: ICategory[];
}

export enum Sort {
    TIME = 'time',
    SOLED = 'soled',
    PRICE = 'price',
    PRICE_DES = '-price',
}
export interface CreateSkuDto {
    name: string;
    img_url: string;
    market_price: number;
    price: number;
    stock: number;
    attributes: IAttribute[];
}
export interface CreateGoodDto {
    cover_url: string;
    code: string;
    banner: string[];
    detail: string[];
    market_price: number;
    price: number;
    name: string;
    tag: number;
    hasSku: boolean;
    total_stock: number;
    categories: number[];
    skus: CreateSkuDto[];
}
export interface IGoodsPage {
    total: number;
    goods: IGood[];
}
export interface IGoodDetail extends IGood {
    attributes: IAttributes;
    skus: ISku[];
    banner: string[];
    detail: string[];
}
export interface GetGoodsPageDto {
    search?: string;
    current_page: number;
    page_size: number;
    category?: number;
    sort?: Sort;
}
export interface UpdateGoodSpuDto {
  id: string;
  code: string;
  cover_url: string;
  market_price: number;
  price: number;
  name: string;
  tag: number;
  total_stock: number;
  sold: number;
  sale_time: string;
  banner: string[];
  detail: string[];
  categories: number[];
}
export interface UpdateGoodSkuDto {
    id: string;
    hasSku: boolean;
    total_stock: number;
    skus: CreateSkuDto[];
}
