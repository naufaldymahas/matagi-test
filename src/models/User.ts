import { Model } from 'objection'

class User extends Model {

    indonesianID!: number
    name!: string
    birthday!: Date

    static tableName = 'users'

    static jsonSchema = {
        type: 'objecy',
        required: ['indonesianID', 'name', 'birthday'],

        properties: {
            indonesianID: { type: 'integer' },
            name: { type: 'string' },
            birthday: { type: 'datetime' },
            createdAt: { type: 'timestamp' },
            updatedAt: { type: ['timestamp', 'null'] },
            deletedAt: { type: ['timestamp', 'null'] }
        }
    }

}

export default User