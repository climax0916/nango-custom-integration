import AppKeyService from 'controllers/AppKey/service'
import { NextFunction, Request, Response } from 'express'
import { currentToken, verifyAccessToken } from 'helpers/Token'
import { isEmpty } from 'lodash'

async function AuthorizationKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const getToken = currentToken(req)
  const token = verifyAccessToken(getToken)

  if (isEmpty(token?.data)) {
    return res.status(401).json({
      code: 401,
      message: token?.message,
    })
  }

  try {
    const { apiKey } = await AppKeyService.getOne(req.getParams('appId'))
    if (apiKey !== getToken) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized',
      })
    }
  } catch (_err) {
    return next(_err);
  }

  next()
}

export default AuthorizationKey
