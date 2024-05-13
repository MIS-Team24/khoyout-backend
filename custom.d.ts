import { UserBody } from "./src/API/types/auth";
declare global {

declare namespace Express {
    export interface Request {
       user?: UserBody
    }
 }
}