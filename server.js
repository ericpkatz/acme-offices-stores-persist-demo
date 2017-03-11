const db = require('./db');
const models = db.models;
const express = require('express');
const swig = require('swig');
const path = require('path');
swig.setDefaults({ cache: false });

const app = express();
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.get('/', (req, res, next)=> {
  Promise.all([
      models.Office.findAll({
        include: [ models.Place ]
      }),
      models.Store.findAll({
        include: [ models.Place ]
      })
  ])
  .then( result => res.render('index', { offices: result[0], stores: result[1] }))
  .catch(next);
});

app.post('/api/days', (req, res, next)=> {
  models.Day.create({})
    .then( day => res.send(day))
    .catch(next);
});

app.delete('/api/days/:id', (req, res, next)=> {
  models.Day.destroy({ where: { id: req.params.id }})
    .then( () => res.sendStatus(200))
    .catch(next);
});

app.get('/api/days', (req, res, next)=>{
  models.Day.findAll({
    include: [ models.Office, models.Store ],
    order: '\"createdAt\"'
  })
    .then( days => res.send(days))
    .catch(next);
});

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));



db.seed()
  .then( ()=> console.log('seeded'))
  .catch( (ex)=> console.log(ex));


