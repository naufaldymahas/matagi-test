import { Router } from 'express'
import UserController from '../controllers/UserController'

class UserRoutes {

    public router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    public routes = (): void => {
        // index
        this.router.get('/v1/users', UserController.index)

        // show
        this.router.get('/v1/users/:id', UserController.show)

        // post
        this.router.post('/v1/users', UserController.create)

    }

}

export default new UserRoutes().router