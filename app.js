const express = require('express');
const morgan = require('morgan');

const app = express();
const tourRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

//*  MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`)); //? This is how you server static files in express

app.use((req, res, next) => {
  console.log('Hello from the middleware!');
  next(); //! Use always next, otherwise the function would get stuck without the response object
});

// * ROUTES
//app.get('/api/v1/tours', getAllTours); //? Get all tours
//app.get('/api/v1/tours/:id', getTour); //? Get a specific tour
//app.post('/api/v1/tours', createTour); //? Create a tour
//app.patch('/api/v1/tours/:id', updateTour); // ? 'patch' can be used as a http method to update data
//app.delete('/api/v1/tours/:id', deleteTour); // ? 'deleted' can be used as a http method to delete data
app.use('/api/v1/auth', tourRouter); // ! Mounting the tours router
app.use('/api/v1/users', userRouter); // ! Mounting the users router

module.exports = app;
