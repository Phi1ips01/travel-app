
const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const cors = require('cors')
// const busOperator = require('../src/bus_operator/router')
// const operatorUpdate = require('../src/operator_update/router')
// const user = require('../src/user/router')
// const trip = require('../src/trip/router')

const port = 3000 ;
app.use(bodyParser.json())
const busRouter = require('../src/bus/router');

app.use('/bus', busRouter);

// app.use('/busOperator',busOperator)
// app.use('/operatorUpdate',operatorUpdate)
// app.use('/user',user)
// app.use('/user',trip)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
