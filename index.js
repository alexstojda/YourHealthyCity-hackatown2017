var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index');
});

const restaurantsAPI = require(`${__dirname}/api/restaurants`)
app.use('/restaurants', restaurantsAPI)

app.get('/create',function(request,response) {
  response.render('create')
});

// stub api call for restaurants until the backend is implemented
app.get('/emeraldrestaurants', (req, res) => {
  res.send([
    {
      id: 1,
      name: 'Foo',
      location: {
        latitude: 45.5085997,
        longitude: -73.6207597
      },
      meals: [
        {
          name: 'steak',
          price: 17.5,
          nutrition: {
            calories: 1150,
            carbohydrates_grams: 20,
            proteins_grams: 12,
            fats_grams: 4
          }
        },
        {
          name: 'salad',
          price: 8,
          nutrition: {
            calories: 780,
            carbohydrates_grams: 7,
            proteins_grams: 0.5,
            fats_grams: 0.1
          }
        }
      ]
    },
    {
      id: 2,
      name: 'Bar',
      location: {
        latitude: 45.510996,
        longitude: -73.616470
      },
      meals: [
        {
          name: 'rice',
          price: 12,
          nutrition: {
            calories: 900,
            carbohydrates_grams: 25,
            proteins_grams: 9,
            fats_grams: 2
          }
        }
      ]
    }
  ])
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


