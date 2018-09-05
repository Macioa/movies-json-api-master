const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const cors           = require('cors');
const PORT = process.env.PORT|9000
console.log(PORT)

require('./db/db');


// SET UP CORS AS MIDDLEWARE, SO any client can make a request to our server
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());


// Require the controller after the middleware
const movieController = require('./controllers/movieController');


app.use('/api/v1/movies', movieController);


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
