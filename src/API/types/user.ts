//change password 
export type ChangePasswordBody = {
    password: string,
    repeatPassword: string
}
//

export enum UserType {
    User = "user",
    Designer = "designer"
}