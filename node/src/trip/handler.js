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
            boarding_point:req.body.boarding_point,
            destination_point:req.body.destination_point ,
            seat_numbers:req.body.seat_numbers,
            address:req.body.address,
            date_of_journey:req.body.date_of_journey,
            age: req.body.age,
            number_of_tickets:req.body.number_of_tickets ,
            total_amount: req.body.total_amount,
            payment_status: req.body.payment_status,
            paid: req.body.paid,
            boarding_time: req.body.boarding_time,
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
        const { id } = req.body;
        const TripData = {
            operator_id:req.body.operator_id ,
            bus_id:req.body.bus_id,
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
            payment_status: req.body.payment_status,
            paid: req.body.paid,
            boarding_time: req.body.boarding_time,
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
        const { id } = req.body;
        const response = await destroyControllerTrip(id);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function showAllTripHandler(req,res)
{
    if(req.query.page && req.query.size)
    {
    try{
        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber = Number.parseInt(req.query.size);
        console.log("agea",pageAsNumber,sizeAsNumber)
        const search = req.query.search?req.query.search:null
        const keyword = req.query.keyword?req.query.keyword:null
        console.log("search and keyword trip",search,keyword)
        const response = await showAllControllerTrip(pageAsNumber,sizeAsNumber,search,keyword);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
else{
    const response = await showAllControllerTrip()
    res.status(200).json({response})
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
