export class AppError extends Error {
    public readonly statusCode: number;
  
    constructor(message: string, statusCode = 400) {
      super(message);
      this.statusCode = statusCode;
  
      // Corrige o prototype chain
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = this.constructor.name;
    }
  }