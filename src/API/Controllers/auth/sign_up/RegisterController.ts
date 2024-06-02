import { Request, Response , NextFunction} from "express";
import { RegisterBody, UserBody } from "../../../types/auth";
import { addUser, findUserBy, getUserByEmail } from "../../../Models/UserModel";
import * as bcrypt from "bcrypt";
import 'dotenv/config';
import { generateOTP } from "../../../../Services/generateOTP";
import { sendEmail } from "../../../../Services/sendEmail";
import { OtpEmailStructure } from "../../../../Services/htmlEmailStructures/OtpEmailStructures";
import { addNewOtp } from "../../../Models/OtpModelModel";
import { generateToken } from "../../../../Services/generateToken";
import { ErrorCode, ResStatus } from "../../../Exceptions/main";
import { BadRequestException } from "../../../Exceptions/badRequest";
import { Messages } from "../../../../Services/responses/Messages";
import { errorResponseTemplate } from "../../../../Services/responses/ErrorTemplate";
import { UserType } from "../../../types/user";
import { addDesigner } from "../../../Models/DesignerModel";

// Helper function to split fullName
function splitName(fullName: string): { firstName: string, lastName: string } {
    const names = fullName.trim().split(' ');
    const firstName = names.shift() || ''; // First element as first name
    const lastName = names.join(' ') || ''; // Rest as last name
    return { firstName, lastName };
}

export async function RegisterHandler(req: Request, res: Response, next: NextFunction) {
    const registerBody = req.body as RegisterBody;
    const registerAs = req.get("Account-Type");

    // Check if user already exists
    const userTarget = await getUserByEmail(registerBody.email);
    if (userTarget) {
        return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
            new BadRequestException(Messages.USER_EXIST, ErrorCode.USER_ALREADY_EXIST, { isUserSaved: false })
        ));
    }

    // If password and repeated password are not the same
    if (registerBody.password !== registerBody.repeatPassword) {
        return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
            new BadRequestException(Messages.PASS_NOT_R_PASS, ErrorCode.PASSWORD_NOT_REPEATED_PASSWORD, { isUserSaved: false })
        ));
    }

    // Split fullName into firstName and lastName
    const { firstName, lastName } = splitName(registerBody.fullName);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(registerBody.password, salt);

    // Add this user to the database
    const newUser = {
        email: registerBody.email,
        fullName: registerBody.fullName,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
        emailActivated: false // Setting default values based on your schema
    };

    let user;

    if (registerAs === "Designer") {
        user = await addDesigner(newUser.email, newUser.firstName, newUser.lastName, newUser.password, {
            about: "Some place holder about me",
            address: "Egypt",
            location: "Alexandria",
            avatarURL: "https://cdn.discordapp.com/avatars/468564013614366720/a_d4a42323372b912261d5503d62caba71.gif?size=512",
            latitude: 13.21,
            ordersFinished: 0,
            longtitude: 31.213,
            yearsOfExperience: 1,

        });
    } else {
        user = await addUser(newUser.email, newUser.firstName, newUser.lastName, newUser.password);
    }

    let userReturnedToFront: UserBody = {
        id: user.baseAccount.id,
        email: user.baseAccount.email,
        emailActivated: false,
        createdAt: user.baseAccount.createdAt,
        firstName: user.baseAccount.firstName,
        lastName: user.baseAccount.lastName,
        phone: user.baseAccount.phone,
        type: registerAs === "Designer"? UserType.Designer : UserType.User
    };

    // Generate a random OTP from 4 numbers
    const otpServer = generateOTP(4);

    // Create token to control the validation time of the OTP
    const validationPeriod = generateToken({}, "5m");

    // Save OTP in the database
    const newOtp = await addNewOtp({
        email: registerBody.email,
        code: otpServer,
        expiredAt: validationPeriod
    });

    // Send OTP
    const success = await sendEmail({
        from: process.env.OWNER_USER_APP,
        to: registerBody.email,
        subject: "Verify your email",
        text: "Verify your email",
        html: OtpEmailStructure(otpServer, "5")
    }, res);

    if (!success) {
        return res.status(ResStatus.SOURCE_CREATED).json({
            message: Messages.USER_SAVED,
            isUserSaved: true,
            user: userReturnedToFront,
            Otp: {
                isOtpSent: success,
                message: Messages.NOT_ABLE_SEND_EMAIL
            }
        });
    }

    return res.status(ResStatus.SOURCE_CREATED).json({
        message: Messages.USER_SAVED,
        isUserSaved: true,
        user: userReturnedToFront,
        Otp: {
            isOtpSent: success,
            keyVal: newOtp.id
        }
    });
}