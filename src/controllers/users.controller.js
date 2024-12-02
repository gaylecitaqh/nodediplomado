// AQUÍ TODA LA LÓGICA DEL NEGOCIO

import {User} from '../models/users.js';
import {Task} from '../models/tasks.js';

import logger from '../logs/logger.js';
import {Status} from '../constants/index.js';

async function getUsers(req, res){
    //return res.send('Get Users')
    try{
        const users=await User.findAll(
            {
                attributes: ['id','username','password','status'],
                order:[['id','DESC']],
                where:{
                    status:Status.ACTIVE,
                }
            } );
        return res.json(users);
    } catch(error){
        logger.error('Error getUsers: ', error);
        res.status(500).json({ message: 'Server error' });
    }
    
}


//funcion crear usuario
async function createUser(req, res){
    try{
        const {username, password} = req.body;
        const user=await User.create({username, password});
        res.json(user);
    } catch(error){
        logger.error('Error createUser: ' + error);
        res.status(500).json({ message: 'Server error create' });
    }
    
}

async function getUser(req, res){
    try{
       // const user = await User.findByPk(req.params.id); // encontrar ID
        //para que devuelva solo algunos datos:
        const user = await User.findByPk(req.params.id, {
            attributes:['username','status']
        });
        
        
        if(!user){
            return res.status(404).json({ message:'User not found' });
        }
        res.json(user);
    } catch (error){
        logger.error('Error getUser: ' + error);
        res.status(500).json({message:'Server error'});
    }
}

async function updateUser(req, res){
    const {id} = req.params;
    const {username,password} = req.body;

    try{
        if(!username || !password)        
            return res
                .status(404)
                .json({message:'Username or password are required'});
        
        const user = await User.update(
            {
                /*username: username,
                password: password,*/
                username,
                password,
            },
            {
                where: {
                    //id:id,
                    id,
                },
            }
        );
        res.json(user)

    } catch(error){
        logger.error('Error getUser: ' + error);
        res.status(500).json({message:'Server error'});
    }
}

async function activateInactivate(req, res){
    const{id}= req.params;
    const{status}=req.body;
    try{
        if(!status)
            return res
                .status(400)
                .json({message:'Status is required'});
        const user = await User.findByPk(id);
        
        if(!user){
            return res.status(404).json({ message: 'User not found'});
        }

        if(user.status === status)
            return res
                .status(400)
                .json({message: 'Status is the same as the current one'});
        user.status = status;
        await user.save();
        res.json(user);
    }catch(error){
        logger.error('Error activateInactivate: ' + error);
        res.status(500).json({ message: 'Server error'});
    }
}


async function deletUser(req, res){
    const{id}=req.params;
    try{
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        await user.destroy();
        res.json({message:'User deleted successfully'});
    }catch(error){
        logger.error('Error deleteUser: ' + error);
        res.status(500).json({ message:'Server error'});
    }
}

async function getTasks(req, res){
    const { id } = req.params
    try{
        const user = await User.findOne({
       // const user = await User.findAll({
            attributes:['username'],
            include: [{
                model: Task,
                attributes:['name', 'done'],
               /* where: {
                    done: false
                }*/
            }],
           where:{ id },
        })
        res.json(user);
    }catch(error){
        logger.error('Error deleteUser: ' + error);
        res.status(500).json({ message:'Server error'});
    }
}
export default{
    getUsers,
    createUser,
    getUser ,
    updateUser,
    activateInactivate,
    deletUser,
    getTasks
}    