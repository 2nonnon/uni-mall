import { ICategories } from './../serve/api/types/category.type';
import { reactive, ref } from 'vue';
import { categoryService } from '../serve/api/category';

const currentCategory = ref<ICategories | null>()
const categories = reactive<ICategories[]>([])

const getCategories = () => {
    categoryService.getCategories().then(res => {
        categories.length = 0
        categories.push(...res)
    })
}

const chooseCategory = (item: typeof currentCategory.value) => {
    currentCategory.value = item
}

export const useCategory = () => {
    return {
        currentCategory,
        categories,
        getCategories,
        chooseCategory
    }
}