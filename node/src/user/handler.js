const {
    createControllerUser,
    updateControllerUser,
    showAllControllerUser,
    showOneByPkControllerUser,
    destroyControllerUser,
    loginControllerUser
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
        const { id } = req.body;
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
    if(req.query.page && req.query.size)
    {
    try{
        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber = Number.parseInt(req.query.size);
        console.log("agea",pageAsNumber,sizeAsNumber)
        const search = req.query.search?req.query.search:null
        const keyword = req.query.keyword?req.query.keyword:null
        console.log("search and keyword user",search,keyword)
        const response = await showAllControllerUser(pageAsNumber,sizeAsNumber,search,keyword);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
else{
    const response = await showAllControllerUser()
    res.status(200).json({response})
}
}
async function showOneByPkUserHandler(req,res)
{
    try{
        const { id } = req.query;
        const response = await showOneByPkControllerUser(id);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function loginUserHandler(req, res) {
    try {
        const userData = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        };
        
        const response = await loginControllerUser(userData);
        console.log("resposne",response)
        if (response.success) {
            res.status(200).json({ message: 'Login successful', user: response.user,token:response.token,payload:response.payload });
        } else {
            res.status(401).json({ error: response.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports={
    createUserHandler,
    updateUserHandler,
    destroyUserHandler,
    showOneByPkUserHandler,
    showAllUserHandler,
    loginUserHandler,
    


}
