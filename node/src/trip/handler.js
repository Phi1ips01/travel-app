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
        const operator_id = req.body.operator_id
        const bus_id = req.body.bus_id
        const operator = await bus_operators.findOne({
            where: { name: operator_id },
          });
          const bus = await buses.findOne({
            where: { name: bus_id },
          });
        const TripData = {
            operator_id:operator.operator_id ,
            bus_id:bus.bus_id,
            trip_id:req.body.trip_id ,
            customer_name:req.body.customer_name ,
            contact:req.body.contact ,
            alternate_contact:req.body.alternate_contact ,
            starting_point:req.body.starting_point ,
            boarding_point:req.body.boarding_point,
            destination_point:req.body.destination_point ,
            seat_numbers:req.body.seat_numbers,
            address:req.body.address,
            date_of_journey:req.body.date_of_journey,
            age: req.body.age,
            number_of_tickets:req.body.number_of_tickets ,
            total_amount: req.body.total_amount,
            paid: req.body.paid,
            remarks: req.body.remarks,
            agents: req.body.agents,
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
        const operator_id = req.body.operator_id
        const bus_id = req.body.bus_id
        const operator = await bus_operators.findOne({
            where: { name: operator_id },
          });
          const bus = await buses.findOne({
            where: { name: bus_id },
          });
        const TripData = {
            operator_id:operator.operator_id ,
            bus_id:bus.bus_id,
            trip_id:req.body.trip_id ,
            customer_name:req.body.customer_name ,
            contact:req.body.contact ,
            alternate_contact:req.body.alternate_contact ,
            starting_point:req.body.starting_point ,
            boarding_point:req.body.boarding_point,
            destination_point:req.body.destination_point ,
            seat_numbers:req.body.seat_numbers,
            address:req.body.address,
            date_of_journey:req.body.date_of_journey,
            age: req.body.age,
            number_of_tickets:req.body.number_of_tickets ,
            total_amount: req.body.total_amount,
            paid: req.body.paid,
            remarks: req.body.remarks,
            agents: req.body.agents,
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
