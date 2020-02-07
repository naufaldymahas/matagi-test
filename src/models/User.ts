import { Model } from 'objection'
import knex from '../../db/connection'
import updatedDate from '../helpers/updatedDate'

Model.knex(knex)

class User extends Model {

    indonesianID!: string
    name!: string
    birthday!: Date
    updatedAt!: string
    deletedAt!: string

    $beforeUpdate = () => {
        this.updatedAt = updatedDate()
    }

    // $beforeDelete = () => {
    //     this.deletedAt = updatedDate()
    // }

    static tableName = 'users'

    static get idColumn () {
        return 'indonesianID'
    }

    static jsonSchema = {
        type: 'object',
        required: ['indonesianID', 'name', 'birthday'],

        properties: {
            indonesianID: { type: 'string', minLength: 17, maxLength: 17 },
            name: { type: 'string', pattern: '^[^0-9]+$' },
            birthday: { type: 'date-time' },
            createdAt: { type: 'string' },
            updatedAt: { type: ['string', 'null'] },
            deletedAt: { type: ['string', 'null'] }
        }
    }

}

export default User