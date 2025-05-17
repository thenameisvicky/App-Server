

const authHandler = require('./auth.server.handler');

exports.signup = async(req, res)=>{
    try{
        console.log('Reached Proxy Signup');
        return authHandler.signup(req,res);
    }catch(error){
        console.error('[PROXY] - error!!!: ',error);
    }
}

exports.login = async(req,res)=>{
    try{
        console.log('Reached Proxy Login');
        return authHandler.login(req,res);
    }catch(error){
        console.error('[PROXY] - error!!!: ',error);
    }
}