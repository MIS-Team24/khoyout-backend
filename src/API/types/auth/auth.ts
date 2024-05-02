export type LoginBody = {
    email: string,
    password: string
}

export type RegisterBody = {
    fullName: string,
    email: string,
    password: string,
    repeatPassword: string,
}

//to send otp to
export type EmailBody = {
    email: string,
}

