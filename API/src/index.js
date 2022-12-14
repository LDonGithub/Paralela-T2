const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

//settings
app.set('port', process.env.PORT || 8080);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.use(require('./routes/pokemon'));

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});