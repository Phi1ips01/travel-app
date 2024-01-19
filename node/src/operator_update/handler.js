const {
    createControllerOperatorUpdate,
    updateControllerOperatorUpdate,
    showAllControllerOperatorUpdate,
    showOneControllerOperatorUpdate,
    destroyControllerOperatorUpdate
} = require('./controller')

async function createOperatorUpdateHandler(req,res)
{
    try{
        const operatorUpdateData = {
            bus_operator_id: req.body.bus_operator_id,
            bus_id: req.body.bus_id,
            trip_id: req.body.trip_id,
            total_amount: req.body.total_amount,
            paid: req.body.paid,
        };
        const response = await createControllerOperatorUpdate(operatorUpdateData);
        res.status(201).json({response:response});
    } catch(error){
        res.status(500).json({error:error})
    }
}
async function updateOperatorUpdateHandler(req,res)
{
    try{
        const { id } = req.query;
        const operatorUpdateData = {
            bus_operator_id: req.body.bus_operator_id,
            bus_id: req.body.bus_id,
            trip_id: req.body.trip_id,
            total_amount: req.body.total_amount,
            paid: req.body.paid,
        };
        const response = await updateControllerOperatorUpdate(id, operatorUpdateData);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function destroyOperatorUpdateHandler(req,res)
{
    try{
        const { id } = req.query;
        const response = await destroyControllerOperatorUpdate(id);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function showAllOperatorUpdateHandler(req,res)
{
    try{
        const response = await showAllControllerOperatorUpdate();
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function showOneOperatorUpdateHandler(req,res)
{
    try{
        const { id } = req.query;
        const response = await showOneControllerOperatorUpdate(id);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports={
    createOperatorUpdateHandler,
    updateOperatorUpdateHandler,
    destroyOperatorUpdateHandler,
    showOneOperatorUpdateHandler,
    showAllOperatorUpdateHandler


}
