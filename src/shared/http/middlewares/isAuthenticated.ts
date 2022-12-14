import AppError from '@shared/http/erros/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticatad(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing');
  }

  // Bearer lLKJHi76yfJHU65hujJYt786t54654687

  const [, token] = authHeader.split(' ');

  try {
    const decodecToken = verify(token, authConfig.jwt.secret);

    console.log(decodecToken);

    const { sub } = decodecToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token.');
  }
}
