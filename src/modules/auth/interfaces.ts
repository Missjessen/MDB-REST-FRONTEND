export interface IUser {
    _id: string;
    email: string;
    googleId: string;
    refreshToken: string;
    iat: number;
    exp: number;
    name: string;
    picture: string;
    accessToken?: string 
  }