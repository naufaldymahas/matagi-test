import { Request, Response, NextFunction } from 'express'
import User from '../models/User'

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
            const user = User.fromJson({ indonesianID, name, birthday })
            res.locals.user = user
            return next()
        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    }
    
}

export default new Validators()