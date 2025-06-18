import { JwtPayload } from 'jsonwebtoken';

export interface IAuthentication extends JwtPayload {
  userId?: string;
}
