const express = require('express');
const router = express.Router();

const Movie = require('../models/movie');

 router.get('/', async (req, res, next) => {
     try  {
        const allMovies = await Movie.find();
          res.json({
          status: 200,
          data: allMovies
        })
      } catch (err){ res.send(err) }
      });

router.post('/', async (req, res) => {
    try {
      console.log(req.body, '= req.body');
      const createdMovie = await Movie.create(req.body);
      res.json({
        status: 200,
        data: createdMovie
    });
    } catch(err){
        res.send(err);
      }
});

router.get('/', async (req, res, next) => {
     try  {
        const foundMovie = await Movie.findById(req.params.id);
        res.json({
          status: 200,
          data: foundMovie
        });
      } catch (err){
        res.send(err);
      }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json({
      status: 200,
      data: updatedMovie
    });
  } catch(err){
    res.send(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
     const deletedMovie = await Movie.findByIdAndRemove(req.params.id);
      res.json({
        status: 200,
        data: deletedMovie
      });
  } catch(err){
    res.send(err);
  }
});



module.exports = router;
