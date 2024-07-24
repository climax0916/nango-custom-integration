import { Request } from 'express'
import models from 'models'
import db from 'models/_instance'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import { DataAttributes } from 'models/data'

const { Sequelize } = db
const { Op } = Sequelize

const { Data } = models

class DataService {
  /**
   *
   * @param req Request
   */
  public static async getAll(req: Request) {
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req.query,
      Data,
      []
    )

    const data = await Data.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })

    const total = await Data.count({
      include: includeCount,
      where: queryFind.where,
    })

    return { message: `${total} data has been received.`, data, total }
  }

  public static async createOne(formData: DataAttributes) {
    return await Data.create(formData)
  }

  public static async removeOne(id: string) {
    return await Data.destroy({
      where: {
        id,
      },
    })
  }

  public static async updateOne(id: string, formData: DataAttributes) {
    return await Data.update(formData, {
      where: {
        id,
      },
    })
  }
}

export default DataService
