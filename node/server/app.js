
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const busOperator = require('../src/bus_operator/router')
const operatorUpdate = require('../src/operator_update/router')
const user = require('../src/user/router')
 const trip = require('../src/trip/router')
 const busRouter = require('../src/bus/router');

const port = 3000 ;

require('./passport');

app.use(bodyParser.json())
app.use(cors())

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/bus', busRouter);
app.use('/busOperator',busOperator)
app.use('/operatorUpdate',operatorUpdate)
app.use('/user',user)
app.use('/trip',trip)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
