import { IUser } from './../serve/api/types/login.type';
import { ref } from 'vue'
import { loginService } from '../serve/api/login';
const hasSignIn = ref(Boolean(loginService.accessToken))
const userInfo = ref<IUser | null>(null)

export const useUser = () => {
    const getUserInfo = () => {
        loginService.getUserInfo().then(res => {
            userInfo.value = res
        })
    }

    const handleSignIn = () => {
        loginService.signin().then(() => {
            hasSignIn.value = true
            getUserInfo()
        })
    }

    const handleSignOut = () => {
        loginService.signout()
        hasSignIn.value = false
    }

    return {
        hasSignIn,
        userInfo,
        getUserInfo,
        handleSignIn,
        handleSignOut
    }
}