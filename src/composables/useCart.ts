import { CreateCartDto } from './../serve/api/types/cart.type';
import { ref, reactive, computed } from "vue";
import { ICart } from "../serve/api/types/cart.type";
import { cartService } from "../serve/api/cart";
import { orderService } from "../serve/api/order";

interface CheckableCart extends ICart {
    checked: boolean;
}

const cartlist = reactive<CheckableCart[]>([]);

const checkAll = ref(false)
const notHasChecked = computed<boolean>(() => {
    return !cartlist.some(item => item.checked)
});
const hasCart = computed<boolean>(() => {
    return cartlist.length > 0
});

const totalPrice = computed<number>(() => {
    return cartlist.reduce((pre, cur) => {
        if (cur.checked) return pre + cur.quantity * cur.sku.market_price;
        else return pre;
    }, 0);
});

const checkCart = (item: CheckableCart) => {
    item.checked = !item.checked
    if (cartlist.every((item) => item.checked)) checkAll.value = true;
    else checkAll.value = false;
};

const checkAllCart = () => {
    checkAll.value = !checkAll.value
    cartlist.forEach((item) => (item.checked = checkAll.value));
};

const addCart = (data: CreateCartDto) => {
    cartService.createCart(data).then(res => {
      console.log(res)
      loadCartlist();
    })
  }

const deleteCart = (id: number) => {
    cartService.deleteCart(id).then((res) => {
        console.log("删除", res);
        loadCartlist();
    });
};

const deleteCarts = (ids: number[]) => {
    cartService.deleteCartByIds({ ids }).then(() => {
        loadCartlist();
    })
}

const loadCartlist = () => {
    cartService.getCarts().then((res) => {
        console.log("cart----", res);
        cartlist.length = 0;
        cartlist.push(
            ...res.map((item) => {
                const tmp = item as CheckableCart;
                tmp.checked = false;
                return tmp;
            })
        );
        console.log("cartlist----", cartlist);
    });
};

export const useCart = () => {
    return {
        hasCart,
        cartlist,
        checkAll,
        notHasChecked,
        totalPrice,
        loadCartlist,
        checkCart,
        checkAllCart,
        addCart,
        deleteCart,
        deleteCarts,
    }
}