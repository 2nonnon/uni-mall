import { ref } from 'vue'
import { loginService } from '../serve/api/login';
const hasSignIn = ref(Boolean(loginService.accessToken))

export const useUser = () => {
    const handleSignIn = () => {
        loginService.signin().then(() => {
            hasSignIn.value = true
        })
    }

    const handleSignOut = () => {
        loginService.signout()
        hasSignIn.value = false
    }

    return {
        hasSignIn,
        handleSignIn,
        handleSignOut
    }
}