import { Response, Request } from 'express'
import User from '../models/User'
import updatedDate from '../helpers/updatedDate'

class UserController {

    // get all users
    findAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const users = await User.query().whereNull('deletedAt')
            return res.json({
                data: users
            })
        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    }

    // get data user by id
    findById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const user = await User.query().findById(req.params.indonesianID)
            return res.json({
                data: user
            })
        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    }

    // create new user
    create = async (req: Request, res: Response): Promise<Response> => {
        const { indonesianID, name, birthday } = req.body
        try {
        User.fromJson({ indonesianID, name, birthday })
            await User.query().insert({
                indonesianID, name, birthday
            })
            return res.json({
                message: 'Data has been created!',
                data: req.body
            })
        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    }

    // create new user or update user
    createOrUpdate = async (req: Request, res: Response): Promise<Response> => {
        const indonesianID = req.params.indonesianID
        const { name, birthday } = req.body
        try {
            User.fromJson({ indonesianID, name, birthday })
            const user = await User.query().findById(indonesianID)
            if (!user) {
                await User.query().insert({ indonesianID, name, birthday })
                return res.json({
                    message: 'Data has been created!',
                    data: { indonesianID, name, birthday }
                })
            }

            await User.query().patch({ name, birthday }).findById(indonesianID)

            return res.json({
                message: 'Data has been updated!',
                data: { indonesianID, name, birthday }
            })
        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const indonesianID = req.params.indonesianID
        const { name, birthday } = req.body
        let patch: any = {}

        try {
            const user = await User.query().findById(indonesianID)
            if (!user) throw 'User not found!'
            User.fromJson({ indonesianID, name: user.name, birthday: user.birthday })
            if (name) patch.name = name
            if (birthday) patch.birthday = birthday
            await User.query().patch(patch).findById(indonesianID)
            return res.json({
                message: 'Data has been updated!',
                data: { indonesianID, name, birthday }
            })
        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const indonesianID = req.params.indonesianID
        try {
            const user = User.query().findById(indonesianID)
            if (!user) throw 'User not found!'
            await User.query().patch({ deletedAt: updatedDate() }).findById(indonesianID)
            return res.json({
                message: 'Data has been deleted!'
            })
        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    }

}

export default new UserController()