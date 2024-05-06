
export const OtpEmailStructure = (otpServer : string ) : string => {
    return `<h2>Welcome to our khoyout service</h2>
    <p>Please, inter this otp to complete the process.</p>
    <p>This code will expire in 5 minutes.</p>
    <h1>${otpServer}</h1>`
}