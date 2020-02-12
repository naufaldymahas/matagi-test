import { Response, Request } from 'express'
import { ValidationError } from 'objection'
import UserModel from '../models/UserModel'

/**
 * User Controller
 */
class UserController {

    /**
     * Type Users
     * @typedef {Users} Users
     * 
     * @property {Object} data object data must returns fetch user results
     * @property {Object} data.results results contain name, indonesianID, page, limit
     * @property {Number} data.results.total total data of all users
     * @property {Number} [data.results.nextPage] nextPage if available
     * @property {Number} [data.results.prevPage] prevPage if available
     * @property {Number} [data.results.page] query to make pagination
     * @property {Number} [data.results.limit] query to make pagination
     * @property {Object[]} data.results.users data of all users
     * @property {String} data.results.users.name name
     * @property {String} data.results.users.indonesianID indonesianID
     * @property {Datetime} data.results.users.birthday birthday
     * @property {Timestamp} data.results.users.createdAt createdAt
     * @property {Timestamp} data.results.users.updatedAt updatedAt
     * @property {Timestamp} data.results.users.deletedAt deletedAt
     */

    /**
     * Type User
     * @typedef {User} User
     * 
     * @property {Object} user
     * @property {String} user.indonesianID indonesianID
     * @property {String} user.name name
     * @property {Datetime} user.birthday birthday
     * @property {Timestamp} [user.createdAt] Will be seen in method findById
     * @property {Timestamp} [user.updatedAt] Will be seen in method findById
     * @property {Timestamp} [user.deletedAt] Will be seen in method findById
     */

    /**
     * Type Message
     * @typedef {Message} Message
     * 
     * @property {string} message will give information
     */

    /**
     * Find All User
     * @async
     * @param {Request} req
     * @param {String} [req.query.name] name
     * @param {String} [req.query.indonesianID] indonesianId
     * @param {Number} [req.query.page] page
     * @param {Number} [req.query.limit] limit
     * @param {Response} res
     * @param {Function} res.json will return json with res.json
     * @returns {Users} return of response that contain Users
     */
    findAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { name, indonesianID } = req.query
            const page: number = parseInt(req.query.page)
            const limit: number = parseInt(req.query.limit)
            let sql: string= ''
            let results: any = {}

            // req.query checker
            if (name) sql += `name like '%${name}%' and `
            if (indonesianID) sql += `indonesianID like '%${indonesianID}%'`
            else sql = sql.slice(0, -5)

            // query
            const users = await UserModel.query()
            .whereRaw(sql)
            .whereNull('deletedAt').page(page - 1, limit ? limit : 10)

            // pagination checker
            if (page) results.page = page
            if (limit) results.limit = limit
            if (limit === users.results.length) results.nextPage = page + 1
            if (page > 1) results.prevPage = page - 1

            return res.json({
                data: {
                    ...results,
                    total: users.total,
                    users: users.results
                }
            })
        } catch (error) {
            res.app.locals = error
            return res.status(400).json({
                error
            })
        }
    }

    /**
     * Find User by indonesianID
     * @async
     * @param {Request} req
     * @param {Object} req.params
     * @param {String} req.params.indonesianID indonesianId
     * @param {Response} res
     * @param {Function} res.json will return json with res.json
     * @returns {User} return of response that contain single User
     */
    findById = async (req: Request, res: Response): Promise<Response> => {
        const { indonesianID } = req.params
        try {
            if (indonesianID.length !== 17) throw new ValidationError({ statusCode: 400, type: 'ModelValidation', data: 'indonesianID length must 17 character!' })
            if (!indonesianID.match(/^[0-9]+$/)) throw new ValidationError({ statusCode: 400, type: 'ModelValidation', data: 'should number only' })
            const user = await UserModel.query().findById(indonesianID).throwIfNotFound()
            return res.json({
                data: user
            })
        } catch (error) {
            return res.status(error.statusCode === 404 ? 404 : 400).json({
                error
            })
        }
    }

    /**
     * Create New User
     * @async
     * @param {Request} req request has been used in middleware
     * @param {Response} res
     * @param {Function} res.json will return json with res.json
     * @param {Object} res.locals.user this object contain request which has been validated
     * @param {String} res.locals.user.indonesianID indonesianID
     * @param {String} res.locals.user.name name
     * @param {String} res.locals.user.birthday birthday
     * @returns {User} created data 
     */
    create = async (req: Request, res: Response): Promise<Response> => {
        try {
            await UserModel.query().insert(res.locals.user)
            return res.status(201).json({
                message: 'Data has been created!',
                user: res.locals.user
            })
        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    }

    /**
     * Create New or Update User
     * @async
     * @param {Request} req request has been used in middleware
     * @param {Response} res
     * @param {Function} res.json will return json with res.json
     * @param {Object} res.locals.user this object contain request which has been validated
     * @param {String} res.locals.user.indonesianID indonesianID
     * @param {String} res.locals.user.name name
     * @param {String} res.locals.user.birthday birthday
     * @returns {User | Message} create or update data 
     */
    createOrUpdate = async (req: Request, res: Response): Promise<Response> => {
        const { indonesianID, name, birthday } = res.locals.user
        try {

            // check is user already exist
            const user = await UserModel.query().findById(indonesianID)

            if (!user) {
                // create new user because user not exist
                await UserModel.query().insert(res.locals.user)
                return res.status(201).json({
                    message: 'Data has been created!',
                    user: res.locals.user
                })
            }

            // updating user because user is exist
            await UserModel.query().patch({ name, birthday }).findById(indonesianID)
            return res.json({
                message: 'Data has been updated!'
            })
        } catch (error) {
            return res.status(400).json({
                error: 'Bad Request'
            })
        }
    }

    /**
     * Update User
     * @async
     * @param {Request} req
     * @param {String} req.params.indonesianID indonesianID
     * @param {String} [req.body.name] name
     * @param {String} [req.body.birthday] birthday
     * @param {Response} res
     * @param {Function} res.json method to return data with json type
     * @returns {Message} update data 
     */
    update = async (req: Request, res: Response): Promise<Response> => {
        const indonesianID: string = req.params.indonesianID
        const { name, birthday } = req.body
        let patch: any = {}

        try {
            const user = await UserModel.query().findById(indonesianID).throwIfNotFound()
            UserModel.fromJson({ 
                indonesianID,
                name: name ? name : user.name,
                birthday: birthday ? birthday : user.birthday
            })
            if (name) patch.name = name
            if (birthday) patch.birthday = birthday
            await UserModel.query().patch(patch).findById(indonesianID).throwIfNotFound()
            return res.json({
                message: 'Data has been updated!'
            })
        } catch (error) {
            return res.status(error.statusCode === 400 ? 400 : 404).json({
                error
            })
        }
    }

    /**
     * Delete User by update deletedAt
     * @async
     * @param {Request} req
     * @param {String} req.params.indonesianID indonesianID
     * @param {Response} res
     * @param {Function} res.json method to return data with json type
     * @returns {Message} delete data 
     */
    delete = async (req: Request, res: Response): Promise<Response> => {
        const { indonesianID } = req.params
        try {
            if (indonesianID.length !== 17) throw new ValidationError({ statusCode: 400, type: 'ModelValidation', data: 'indonesianID length must 17 character!' })
            if (isNaN(parseInt(indonesianID))) throw new ValidationError({ statusCode: 400, type: 'ModelValidation', data: 'should number only' })
            await UserModel.query()
                .patch({})
                .findById(indonesianID)
                .throwIfNotFound()
                .context({ delete: true })
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