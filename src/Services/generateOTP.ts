


export const generateOTP = (length : number)=>{
    let otp : string = ""

    for (let index = 0; index < length; index++) {      
        otp += Math.floor(Math.random()*10)
    }

    return otp
}
