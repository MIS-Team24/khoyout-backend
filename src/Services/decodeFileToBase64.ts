import { decode } from "base64-arraybuffer";

export const decodeFileToBase64 = (file : any) => {
    return decode(file.buffer.toString("base64"))
}
