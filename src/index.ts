import express, { Application } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'

// Routers
import UserRoutes from './routers/UserRoutes'

// Setup Application
class App {
    public app: Application

    constructor() {
        this.app = express()
        this.plugins()
        this.routes()
    }

    protected plugins = (): void => {
        // setting to use json()
        this.app.use(express.json())
        this.app.use('/documentation/v1/', swaggerUi.serve)
    }

    protected routes = (): void => {
        // routes to userRoutes
        this.app.use('/api', UserRoutes)

        // routes swagger
        this.app.get('/documentation/v1/', swaggerUi.setup(swaggerDocument))
    }

}

export const app = new App().app

export default App