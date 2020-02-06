import { Response, Request } from 'express'

class UserController {

    index = async (req: Request, res: Response): Promise<Response> => {
        return res.send('ini endpoint index')
    }

    show = (req: Request, res: Response): Response => {
        return res.send(req.params.id)
    }

    create = (req: Request, res: Response): Response => {
        return res.send(req.body)
    }

}

export default new UserController()