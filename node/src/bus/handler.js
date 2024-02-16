const {
    createControllerBus,
    updateControllerBus,
    showAllControllerBus,
    showOneControllerBus,
    destroyControllerBus
} = require('./controller')
const {bus_operators,buses} = require("../../models")
async function createBusHandler(req,res)
{
    try{
        console.log("handler")
        const busData = {
            bus_operator_id:req.body.bus_operator_id,
            // bus_id:req.body.bus_operator_id,
            name:req.body.name,
            type: req.body.type,
            share:req.body.share,
            // total_amount: req.body.total_amount,
            // share_deducted_amount: req.body.share_deducted_amount
        };
        const response = await createControllerBus(busData);
        res.status(201).json({response:response});
    } catch(error){
        res.status(500).json({error:error})
    }
}
async function updateBusHandler(req,res)
{
    try{
        console.log("req,bdy",req.body)
        const { id } = req.body;
        const busData = {
            bus_operator_id:req.body.bus_operator_id,
            // bus_id:req.body.bus_operator_id,
            name:req.body.name,
            type: req.body.type,
            share:req.body.share,
            total_amount: req.body.total_amount,
            share_deducted_amount: req.body.share_deducted_amount
        };
        const response = await updateControllerBus(id, busData);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function destroyBusHandler(req,res)
{
    try{
        console.log("handlerdeleteBUs", req.body)

        const { id } = req.body;
        const response = await destroyControllerBus(id);
    res.status(200).json({ response });
  } catch (error) {
    console.log(req)
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function showAllBusHandler(req,res)
{
    try{
        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber = Number.parseInt(req.query.size);
        console.log("agea",pageAsNumber,sizeAsNumber)
        const response = await showAllControllerBus(pageAsNumber,sizeAsNumber);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function showOneBusHandler(req,res)
{
    try{
        const { id } = req.query;
        const response = await showOneControllerBus(id);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports={
    createBusHandler,
    updateBusHandler,
    destroyBusHandler,
    showOneBusHandler,
    showAllBusHandler


}
