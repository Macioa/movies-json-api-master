// This is where we will set up our db connection
const mongoose = require('mongoose');

// food is the name of our database
// that is automatically created
const dburl = process.env.DBURL|'mongodb://localhost/moviesOne'
console.log(`connecting to ${dburl}`)
mongoose.connect(dburl);

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected')
});

mongoose.connection.on('error', (err) => {
  console.log(err, ' mongoose failed to connect')
});

mongoose.connection.on('disconncted', () => {
  console.log('Mongoose is disconnected')
});
