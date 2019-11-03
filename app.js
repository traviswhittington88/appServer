const express = require('express');
const morgan = require('morgan');
const apps = require('./apps-data.js');

const app = express();

app.use(morgan('common'));


app.get('/apps', (req, res) => {
  const { sort, genres } = req.query;
  let results = apps.map(app => { return app })

  if(sort) {
    if(!['rating','app'].includes(sort)) {
      res.status(400).send(`Sort must be one of rating or app`);
    }
  }
  if(sort) {
    if(sort.includes('app')) {
      results.sort((a, b) => {
      
      return a.App.toUpperCase() > b.App.toUpperCase() ? 1 : a.App.toUpperCase() < b.App.toUpperCase() ? -1 : 0; 
    })
    res.status(200).json(results);
    }
  }
  if(sort) {
    if(sort.includes('rating')) {
      results.sort((a, b) => {
      
      return a.Rating > b.Rating ? 1 : a.Rating < b.Rating ? -1 : 0; 
    })
    res.status(200).json(results);
    }
  }
 
  if(genres) {
    if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
      res.status(400).send(`genres must be one of 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'.`)
    }
  }
  if(genres) {
    let results = apps.filter(app => app.Genres === genres);
    res.status(200).json(results)

  }

  res.status(200).json(apps);
})

app.listen(8000, () => {
  console.log(`server listening at http://localhost:8000/apps`);
});
