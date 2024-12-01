
import { Sequelize } from 'sequelize';
import 'dotenv/config'

const sequelize = new Sequelize(
    /*nodediplomado_db,//llamar db name
    postgres, //llamar db username
    postgres//llamar pass*/

    process.env.DB_DATABASE, //llamar db name
    process.env.DB_USER,    //llamar db username
    process.env.DB_PASSWORD, //llamar pass

    {
        host: 'localhost',
        dialect:'postgres',
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,//'postgres',
        logging: console.log,

        // este cambio es sólo para subir no para local
        dialectOptions:{
            ssl:{
                require: true,
                rejectUnauthorized: false,
            }
        }
    }
);



export default sequelize
