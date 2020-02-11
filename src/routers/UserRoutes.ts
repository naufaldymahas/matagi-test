import { Router } from 'express'
import UserController from '../controllers/UserController'
import Validators from '../middleware/validators'

class UserRoutes {

    public router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    public routes = (): void => {
        // index
        this.router.get('/v1/users', UserController.findAll)

        // show
        this.router.get('/v1/users/:indonesianID', UserController.findById)

        // post
        this.router.post('/v1/users', Validators.usersValidators, UserController.create)

        // put
        this.router.put('/v1/users/:indonesianID', Validators.usersValidators, UserController.createOrUpdate)

        // patch
        this.router.patch('/v1/users/:indonesianID', Validators.usersValidators, UserController.update)

        // delete
        this.router.delete('/v1/users/:indonesianID', UserController.delete)

    }

}

export default new UserRoutes().router