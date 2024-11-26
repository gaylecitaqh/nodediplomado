import pino from 'pino';

// CREAMOS UNA FRONTERA
const logger = pino({
    transport :{
        target: 'pino-pretty',
        options:{
            translateTime: 'SYS:dd-mm-yyyy HH:mm:ss',
        },
    },
});

export default logger;
