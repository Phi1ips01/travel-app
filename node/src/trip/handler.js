const {
    createControllerTrip,
    updateControllerTrip,
    showAllControllerTrip,
    showOneControllerTrip,
    destroyControllerTrip
} = require('./controller')

async function createTripHandler(req,res)
{
    try{
        const TripData = {
            operator_id:req.body.operator_id ,
            bus_id:req.body.bus_id ,
            trip_id:req.body.trip_id ,
            customer_name:req.body.customer_name ,
            contact:req.body.contact ,
            alternate_contact:req.body.alternate_contact ,
            starting_point:req.body.starting_point ,
            destination_point:req.body.destination_point ,
            address:req.body.address,
            age: req.body.age,
            number_of_tickets:req.body.number_of_tickets ,
            total_amount: req.body.total_amount,
            paid: req.body.paid
        };
        const response = await createControllerTrip(TripData);
        res.status(201).json({response:response});
    } catch(error){
        res.status(500).json({error:error})
    }
}
async function updateTripHandler(req,res)
{
    try{
        const { id } = req.query;
        const TripData = {
            operator_id:req.body.operator_id ,
            bus_id:req.body.bus_id ,
            trip_id:req.body.trip_id ,
            customer_name:req.body.customer_name ,
            contact:req.body.contact ,
            alternate_contact:req.body.alternate_contact ,
            starting_point:req.body.starting_point ,
            destination_point:req.body.destination_point ,
            address:req.body.address,
            age: req.body.age,
            number_of_tickets:req.body.number_of_tickets ,
            total_amount: req.body.total_amount,
            paid: req.body.paid
        };
        const response = await updateControllerTrip(id, TripData);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function destroyTripHandler(req,res)
{
    try{
        const { id } = req.query;
        const response = await destroyControllerTrip(id);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function showAllTripHandler(req,res)
{
    try{
        const response = await showAllControllerTrip();
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function showOneTripHandler(req,res)
{
    try{
        const { id } = req.query;
        const response = await showOneControllerTrip(id);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports={
    createTripHandler,
    updateTripHandler,
    destroyTripHandler,
    showOneTripHandler,
    showAllTripHandler


}
