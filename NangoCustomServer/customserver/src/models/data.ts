import { Model, Optional } from 'sequelize'
import SequelizeAttributes from 'utils/SequelizeAttributes'
import db from './_instance'

export interface DataAttributes {
  id?: string
  projectName: string
  developers: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

interface DataCreationAttributes extends Optional<DataAttributes, 'id'> {}

export interface DataInstance
  extends Model<DataAttributes, DataCreationAttributes>,
    DataAttributes { }

const Data = db.sequelize.define<DataInstance>(
  'Data',
  {
    ...SequelizeAttributes.Data,
  },
  {
    paranoid: true,
  }
)

export default Data;
