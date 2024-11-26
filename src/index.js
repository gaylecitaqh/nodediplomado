//parte del servidor

import app from './app.js';
import sequelize from './database/database.js';
import 'dotenv/config';
import logger from './logs/logger.js';

async function main(){
    //app.listen(3000);
    //console.log('listening on port 3000');

   /* const port=3001;
    app.listen(port);
    console.log('listening on port',port);*/
    //await sequelize.sync();
    await sequelize.sync( { force:false}, );
    
    
    const port = process.env.PORT;
    app.listen(port);
   // console.log('listening on port',port);
    logger.info(`Server started on port ${port}`);
   /* logger.error(`Server started on port ${port}`);
    logger.warn(`Server started on port ${port}`);
    logger.fatal(`Server stopped on port ${port}`);*/
    
}

main();