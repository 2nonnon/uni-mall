export interface CreateCategoryDto {
    name: string
    parentId: number
}

export interface ICategory {
    id: number
    name: string
    parentId: number
  }

export interface ICategories extends ICategory {
    children?: ICategories[]
}
