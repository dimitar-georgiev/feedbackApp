/**
 * Created by Mitaka on 16-Oct-17.
 */
const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User'); //this should be always required before services/passport and after mongoose
require('./services/passport'); //no variable/const assignment because passport.js doesn't have export statement
const authRoutes = require('./routes/authRoutes');



mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
// require('./routes/authRoutes')(app); // The same as the above
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'));

    const path = require('path');

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);