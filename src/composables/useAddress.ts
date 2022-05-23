import { computed, reactive } from 'vue';
import { ref } from 'vue';
import { addressService } from '../serve/api/address';
import { IAddress } from './../serve/api/types/address.type';

const choosedAddress = ref<IAddress | null>(null)

const addressList = reactive<IAddress[]>([])

const notHasAddress = computed(() => {
    return addressList.length === 0
  })

const loadAddressList = () => {
    addressService.getAddresses().then((res) => {
        console.log('get all addresses', res)
        addressList.length = 0
        addressList.push(...res)
        initChoosedAddress()
    })
}

const initChoosedAddress = () => {
    if (!choosedAddress.value) {
        choosedAddress.value = addressList.find(item => item.isDefault) ?? addressList[0]
    } else {
        choosedAddress.value = addressList.find(item => item.id === choosedAddress.value!.id) ?? addressList[0]
    }
}

const ChangeChoosedAddress = (item: IAddress) => {
    choosedAddress.value = item
}

export const useAddress = () => {
    return {
        choosedAddress,
        addressList,
        notHasAddress,
        loadAddressList,
        initChoosedAddress,
        ChangeChoosedAddress
    }
}