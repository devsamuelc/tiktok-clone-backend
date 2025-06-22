import { JwtPayload } from 'jsonwebtoken';

export interface IAuthentication extends JwtPayload {
  authUserId: string;
}
