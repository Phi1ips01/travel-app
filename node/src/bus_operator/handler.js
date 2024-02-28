const {
    createControllerBusOperator,
    updateControllerBusOperator,
    showAllControllerBusOperator,
    showOneControllerBusOperator,
    destroyControllerBusOperator
} = require('./controller')

async function createBusOperatorHandler(req,res)
{
    try{
        const busOperatorData = {
            // bus_operator_id: 201,
            name: req.body.name,
            contact: req.body.contact,
            // total_amount: req.body.total_amount,
            // profit: req.body.profit,
            paid: req.body.paid,
            // remaining_payment:req.body.remaining_payment
        };
        const response = await createControllerBusOperator(busOperatorData);
        res.status(201).json({response:response});
    } catch(error){
        res.status(500).json({error:error})
    }
}
async function updateBusOperatorHandler(req,res)
{
    try{
        // console.log("update",req.body)
        const { id } = req.body;
        const busOperatorData = {
            // bus_operator_id: 202,
            name: req.body.name,
            contact: req.body.contact,
            // total_amount: req.body.total_amount,
            // profit: req.body.profit,
            paid: req.body.paid,
            // remaining_payment:req.body.remaining_payment
        };
        const response = await updateControllerBusOperator(id, busOperatorData);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function destroyBusOperatorHandler(req,res)
{
    try{
        // console.log(req.body)
        const { id } = req.body;
        const response = await destroyControllerBusOperator(id);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function showAllBusOperatorHandler(req,res)
{
    if(req.query.page && req.query.size)
    {
        try{
            const pageAsNumber = Number.parseInt(req.query.page);
            const sizeAsNumber = Number.parseInt(req.query.size);
            console.log("agea",pageAsNumber,sizeAsNumber)
            const search = req.query.search?req.query.search:null
            const keyword = req.query.keyword?req.query.keyword:null
            console.log("search and keyword bus operator",search,keyword)
            const response = await showAllControllerBusOperator(pageAsNumber,sizeAsNumber,search,keyword);
        res.status(200).json({ response });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    else{
        const response = await showAllControllerBusOperator()
        res.status(200).json({response})
    }
}
async function showOneBusOperatorHandler(req,res)
{
    try{
        // console.log("hi",req.query)
        const { id } = req.query;
        const response = await showOneControllerBusOperator(id);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports={
    createBusOperatorHandler,
    updateBusOperatorHandler,
    destroyBusOperatorHandler,
    showOneBusOperatorHandler,
    showAllBusOperatorHandler


}
