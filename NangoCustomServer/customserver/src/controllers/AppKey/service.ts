import ms from 'ms'
import models from 'models'
import db from 'models/_instance'
import { AppKeyAttributes } from 'models/appkey'
import ResponseError from 'modules/Response/ResponseError'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'

const { JWT_SECRET_ACCESS_TOKEN, JWT_SECRET_REFRESH_TOKEN }: any = process.env

const JWT_ACCESS_TOKEN_EXPIRED = process.env.JWT_ACCESS_TOKEN_EXPIRED || '1d' // 1 Days
const JWT_REFRESH_TOKEN_EXPIRED = process.env.JWT_REFRESH_TOKEN_EXPIRED || '30d' // 30 Days

const expiresIn = ms(JWT_ACCESS_TOKEN_EXPIRED) / 1000

const { Sequelize } = db
const { Op } = Sequelize

const { AppKey } = models

class AppKeyService {
  /**
   *
   * @param id
   * @param paranoid
   */
  public static async getOne(id: string, paranoid?: boolean) {
    const data = await AppKey.findByPk(id, {
      paranoid,
    })

    if (!data) {
      throw new ResponseError.NotFound(
        'user data not found or has been deleted'
      )
    }

    return data
  }

  public static async addApp({ appName }: AppKeyAttributes) {
    const payloadApiKey = {
      id: uuidv4(),
      appName,
    }

    const apiKey = jwt.sign(
      JSON.parse(JSON.stringify(payloadApiKey)),
      JWT_SECRET_ACCESS_TOKEN,
      {
        expiresIn,
      }
    )

    const data = await AppKey.create({ ...payloadApiKey, apiKey })

    return {
      message: 'successfully generated an apiKey',
      data: {
        apiKey: data.apiKey,
        appId: data.id,
        appName: data.appName,
      },
    }
  }
}

export default AppKeyService
