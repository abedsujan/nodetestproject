var express = require('express');
const bodyParser = require('body-parser');
const studentRoter = require('./routerStudents');

const port = 8001;
const app = express();

var logger = function (req, res, next) {
    console.info(`GOT REQUEST! ${req.method} ${req.originalUrl}`)
    next(); // Passing the request to the next handler in the stack.
}
app.use(logger);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('HYF api'));

app.use('/api', studentRoter);

app.listen(port, () => console.log(`HYF app listening on port ${port}!`))