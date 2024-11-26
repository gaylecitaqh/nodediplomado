import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function authenticateToken(req, res, next){
    //obtenemos el jwt de la cabecera autorizcion
    const authHeader = req.headers['authorization'];
    console.log('authHeader', authHeader);

    const token = authHeader && authHeader.split(' ')[1]
    console.log('token',token);

    if(token === null) return res.sendStatus(401);//Forbidden

    //verificamos y decodificamos el token
    const secret = process.env.JWT_SECRET
    jwt.verify(token, secret, (err, user) => {
        if(err){
            console.log('error',err);
            return res.sendStatus(403);
        }

        //si el token es valido
        console.log('user',user)

        req.user = user;
        next();
    })
}
//