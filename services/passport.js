/**
 * Created by Mitaka on 18-Oct-17.
 */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => { //creates cookie based token
    done(null, user.id); //user is a single record from mongo
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {

        User.findOne({googleId: profile.id})
            .then((existingUser) => {

                if(existingUser){
                    done(null, existingUser);
                }
                else {
                    new User({googleId: profile.id})
                        .save()
                        .then(user => done(null, user));
                }
            });


        // console.log('accessToken', accessToken);
        // console.log('refreshToken', refreshToken);
        // console.log('profile', profile);
        // console.log('done', done);
    }
));