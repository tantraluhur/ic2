import { CommonsException } from "../../commons/exceptions/exception";

export class JoiException extends CommonsException {
    statusCode: number;
    constructor(message : string, statusCode : number = 400) {
      super(message)
      this.statusCode = statusCode;
    }
 }