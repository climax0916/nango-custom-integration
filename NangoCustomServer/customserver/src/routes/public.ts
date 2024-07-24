import express from 'express'

const router = express.Router()

export default router

require('controllers/Auth/controller')
require('controllers/AppKey/controller')
require('controllers/Data/controller')
require('controllers/RefreshToken/controller')
require('controllers/Session/controller')
