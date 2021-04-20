import 'dotenv/config'
import 'reflect-metadata'
import express from 'express'

import './database'

import routes from './routes'

const server = express()

/**
 * Get -> buscar
 * Post -> criar
 * Put -> editar
 * Delete -> deletar
 * Patch -> alterar uma informação especifica (tipo, alterar somente uma senha da entidade Usuário)
 */

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(routes)

const port = process.env.APP_PORT
server.listen(port, () => console.log(`server running port ${port}`))
