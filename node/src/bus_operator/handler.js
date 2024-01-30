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
            bus_operator_id: req.body.bus_operator_id,
            name: req.body.name,
            contact: req.body.contact,
            // total_amount: req.body.total_amount,
            // profit: req.body.profit,
            // paid: req.body.paid,
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
        const { id } = req.body;
        const busOperatorData = {
            bus_operator_id: req.body.bus_operator_id,
            name: req.body.name,
            contact: req.body.contact,
            // total_amount: req.body.total_amount,
            // profit: req.body.profit,
            // paid: req.body.paid,
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
        console.log(req.body)
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
    try{
        const response = await showAllControllerBusOperator();
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function showOneBusOperatorHandler(req,res)
{
    try{
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
