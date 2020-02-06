import express, { Application } from 'express'

// Routers
import UserRoutes from './routers/UserRoutes'

const PORT = 8080

class App {
    public app: Application

    constructor() {
        this.app = express()
        this.plugins()
        this.routes()
    }

    protected plugins = (): void => {
        this.app.use(express.json())
    }

    protected routes = (): void => {
        this.app.use('/api', UserRoutes)
    }

}

const app = new App().app

app.listen(PORT, () => console.log('Listening to port ' + PORT))