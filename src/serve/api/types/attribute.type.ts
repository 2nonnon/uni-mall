export interface CreateAttributeDto {
    name: string
    parentId: number
}

export interface IAttribute {
    id: number
    name: string
    parentId: number
  }

export interface IAttributes extends IAttribute {
    children?: IAttributes[]
}
