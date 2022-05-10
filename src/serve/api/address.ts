import BaseHttpService from '../base-http.service'
import { CreateAddressDto, IAddress } from './types/address.type'
import cities from '../../static/list.json'

class AddressService extends BaseHttpService {
    private BASE_URL = 'addresses'

    getCities() {
        return cities.data
    }

    async getAddresses() {
        return await this.get<IAddress[]>(`${this.BASE_URL}`)
    }

    async getDefaultAddresses() {
        return await this.get<IAddress>(`${this.BASE_URL}/default`)
    }

    async getAddressById(id: string) {
        return await this.get<IAddress>(`${this.BASE_URL}/${id}`)
    }

    async createAddress(form: CreateAddressDto) {
        return await this.post<IAddress>(`${this.BASE_URL}`, form)
    }

    async deleteAddress(id: string) {
        return await this.delete<void>(`${this.BASE_URL}/${id}`)
    }

    async wxUpdateAddress(id: string, form: CreateAddressDto) {
        return await this.post<IAddress>(`${this.BASE_URL}/${id}`, form)
    }

    async wxUpdateAddressChoose(id: string) {
        return await this.post<IAddress>(`${this.BASE_URL}/${id}/choose`)
    }
}

export const addressService = new AddressService()
