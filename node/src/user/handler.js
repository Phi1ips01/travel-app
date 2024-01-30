const {
    createControllerUser,
    updateControllerUser,
    showAllControllerUser,
    showOneControllerUser,
    destroyControllerUser
} = require('./controller')

async function createUserHandler(req,res)
{
    try{
        const UserData = {
            username:req.body.username ,
            email:req.body.email ,
            password:req.body.password ,
            role:req.body.role 
        };
        const response = await createControllerUser(UserData);
        res.status(201).json({response:response});
    } catch(error){
        res.status(500).json({error:error})
    }
}
async function updateUserHandler(req,res)
{
    try{
        const { id } = req.query;
        const UserData = {
            username:req.body.username ,
            email:req.body.email ,
            password:req.body.password ,
            role:req.body.role 
        };
        const response = await updateControllerUser(id, UserData);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function destroyUserHandler(req,res)
{
    try{
        console.log("req.body.handler",req.body)
        const { id } = req.body;
        const response = await destroyControllerUser(id);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function showAllUserHandler(req,res)
{
    try{
        const response = await showAllControllerUser();
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function showOneUserHandler(req,res)
{
    try{
        const { id } = req.query;
        const response = await showOneControllerUser(id);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports={
    createUserHandler,
    updateUserHandler,
    destroyUserHandler,
    showOneUserHandler,
    showAllUserHandler


}
