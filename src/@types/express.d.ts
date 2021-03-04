declare namespace Express {
  export interface Request {
    user: {
      id: string;
      type: 'client' | 'provider';
    };

    stock: {
      price: number;
    };
  }
}
