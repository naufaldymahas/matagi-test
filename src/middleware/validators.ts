import { Request, Response, NextFunction } from 'express'
import UserModel from '../models/UserModel'

/**
 * Middleware Validators
 */
class Validators {

    /**
     * @param {Request} req
     * @param {String} [req.body.indonesianID] indonesianID
     * @param {String} [req.params.indonesianID] indonesianID
     * @param {String} req.body.name name
     * @param {Datetime} req.body.birthday birthday
     * @param {Response} res
     * @param {Object} res.locals.user
     * @param {String} res.locals.user.indonesianID indonesianID that has passed validation
     * @param {String} res.locals.user.name name that has passed validation
     * @param {String} res.locals.user.birthday birthday that has passed validation
     * @param {NextFunction} next function to next process
     * @return {next()} if valid it will proceed to the next function
     */
    usersValidators = (req: Request, res: Response, next: NextFunction): any => {
        try {
            const indonesianID: string = req.body.indonesianID || req.params.indonesianID
            const { name, birthday } = req.body
            const user = UserModel.fromJson({ indonesianID, name, birthday })
            res.locals.user = user
            return next()
        } catch (error) {
            const { indonesianID, name } = error.data
            if (indonesianID) {
                for (let i = 0; i < indonesianID.length; i++) {
                    if (indonesianID[i].keyword === 'pattern') indonesianID[i].message = 'should number only'
                }
            }
            if (name) {
                for (let i = 0; i < name.length; i++) {
                    if (name[i].keyword === 'pattern') name[i].message = 'no number or symbol'
                }
            }
            return res.status(400).json({
                error
            })
        }
    }
    
}

export default new Validators()