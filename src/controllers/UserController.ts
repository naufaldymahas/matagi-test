import { Response, Request } from 'express'
import User from '../models/User'
import updatedDate from '../helpers/updatedDate'

class UserController {

    // get all users
    findAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { name, indonesianID } = req.query
            const page: number = parseInt(req.query.page)
            let sql: string= ''

            if (name) sql += `name like '%${name}%' and `
            if (indonesianID) sql += `indonesianID like '%${indonesianID}%'`
            else sql = sql.slice(0, -5)

            const users = await User.query()
            .whereRaw(sql)
            .whereNull('deletedAt').page(page ? page - 1 : 0, 5)
            return res.json({
                data: {
                    page,
                    total: users.total,
                    users: users.results
                }
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
            const user = await User.query().findById(req.params.indonesianID).throwIfNotFound()
            return res.json({
                data: user
            })
        } catch (error) {
            return res.status(404).json({
                error
            })
        }
    }

    // create new user
    create = async (req: Request, res: Response): Promise<Response> => {
        const { indonesianID, name, birthday } = req.body
        try {
        User.fromJson({ indonesianID, name, birthday })
            await User.query().insert({ indonesianID, name, birthday })
            return res.status(201).json({
                message: 'Data has been created!',
                user: { indonesianID, name, birthday }
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
                return res.status(201).json({
                    message: 'Data has been created!',
                    user: { indonesianID, name, birthday }
                })
            }

            await User.query().patch({ name, birthday }).findById(indonesianID)

            return res.json({
                message: 'Data has been updated!'
            })
        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    }

    // update data only
    update = async (req: Request, res: Response): Promise<Response> => {
        const indonesianID = req.params.indonesianID
        const { name, birthday } = req.body
        let patch: any = {}

        try {
            const user = await User.query().findById(indonesianID).throwIfNotFound()
            User.fromJson({ indonesianID, name: user.name, birthday: user.birthday })
            if (name) patch.name = name
            if (birthday) patch.birthday = birthday
            await User.query().patch(patch).findById(indonesianID)
            return res.json({
                message: 'Data has been updated!'
            })
        } catch (error) {
            return res.status(error.statusCode === 404 ? 404 : 400).json({
                error
            })
        }
    }

    // soft delete by adding deletedAt
    delete = async (req: Request, res: Response): Promise<Response> => {
        const indonesianID = req.params.indonesianID
        try {
            await User.query().patch({ deletedAt: updatedDate.now() }).findById(indonesianID).throwIfNotFound()
            return res.json({
                message: 'Data has been deleted!'
            })
        } catch (error) {
            return res.status(404).json({
                error
            })
        }
    }

}

export default new UserController()