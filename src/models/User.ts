import { Model, QueryContext, ModelOptions } from 'objection'
import knex from '../../db/connection'
import updatedDate from '../helpers/updatedDate'

Model.knex(knex)

/**
 * UserModel
 */
class UserModel extends Model {

    indonesianID!: string
    name!: string
    birthday!: Date
    updatedAt!: string
    deletedAt!: string

    /**
     * @param {ModelOptions} opt
     * @param {QueryContext} queryContext
     * @param {String} [queryContext.delete] if true it will delete user by adding deletedAt
     * @return {Function} return updatedDate.now() function
     */
    $beforeUpdate = (opt: ModelOptions, queryContext: QueryContext): any => {
        this.updatedAt = updatedDate.now()
        if (queryContext.delete) this.deletedAt = updatedDate.now()
    }

    /**
     * static tableName = 'users'
     */
    static tableName = 'users'

    /**
     * Setting id
     */
    static get idColumn () {
        return 'indonesianID'
    }

    /**
     * Setting Validator with jsonSchema
     * @static jsonSchema
     */
    static jsonSchema = {
        type: 'object',
        required: ['indonesianID', 'name', 'birthday'],

        properties: {
            indonesianID: { type: 'string', minLength: 17, maxLength: 17, pattern: '^[0-9]*$' },
            name: { type: 'string', pattern: '^[^0-9]+$' },
            birthday: { type: 'string', format: 'date' },
            createdAt: { type: 'string' },
            updatedAt: { type: ['string', 'null'] },
            deletedAt: { type: ['string', 'null'] }
        }
    }

}

export default UserModel