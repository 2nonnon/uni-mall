export interface ILoginForm {
    username: string
    password: string
}

export interface ISigninResponse {
    accessToken: string
}

export interface IUser {
    profile: string
    username: string
    collection: string[]
}
