var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
const cloudinaryClient = require('./cloudinaryClient');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 80;        // set our port
var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/images', (req, res) => {
    cloudinaryClient.getImages()
        .then(images => res.json({data: images}))
        .catch(e => res.status(500).json(e))
});

app.use('/api', router);
app.use(express.static('dist'));
app.listen(port);
console.log('Magic happens on port ' + port);


