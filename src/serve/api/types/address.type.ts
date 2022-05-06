export interface CreateAddressDto {
    receiver: string;
    mobile: string;
    destination: string;
    remark?: string;
    isDefault: boolean;
}

export interface IAddress extends Required<CreateAddressDto> {
    id: string;
    isChoosed: boolean;
}