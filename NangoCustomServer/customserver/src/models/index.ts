import AppKey from './appkey'
import Data from './data'
import RefreshToken from './refreshtoken'
import Session from './session'

const models = {
  AppKey,
  RefreshToken,
  Session,
  Data,
}

export default models

export type MyModels = typeof models

Object.entries(models).map(([, model]) => {
  if (model?.associate) {
    model.associate(models)
  }
  return model
})
