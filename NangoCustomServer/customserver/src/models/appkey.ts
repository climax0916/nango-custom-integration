import { Model, Optional } from 'sequelize'
import SequelizeAttributes from 'utils/SequelizeAttributes'
import db from './_instance'

export interface AppKeyAttributes {
  id: string
  appName: string
  apiKey?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface TokenAttributes {
  data: AppKeyAttributes
  message: string
}

export interface LoginAttributes {
  apiKey: string
  appId: string
}


interface AppKeyCreationAttributes extends Optional<AppKeyAttributes, 'id'> {}

export interface AppKeyInstance
  extends Model<AppKeyAttributes, AppKeyCreationAttributes>,
    AppKeyAttributes { }

const App = db.sequelize.define<AppKeyInstance>(
  'AppKeys',
  {
    ...SequelizeAttributes.AppKeys,
  },
  {
    paranoid: true,
  }
)

export default App;
