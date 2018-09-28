const localStrategy = require('passport-local').Strategy


const User = require('../app/models/user.js')


module.exports = function(passport)
{
    passport.serializeUser(function(user,done)
    {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done)
    {
        User.findById(id, function(err, user)
        {
            done(err, user)
            console.log(err)
            console.log(user)
        })
    }
    )

//Signup
    passport.use('local-signup', new localStrategy(
        {
            usernameField: 'user',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, user, password, done)
        {
            User.findOne({'local.user':user}, function(err, acount)
            {
                if(err){
                    console.log(err+'primer if')
                    return done(err)
                }
                if(acount)
                {   
                    console.log('segundo if')
                    console.log('El usuario ya existe')
                    return done(null, false, req.flash('signupMessage ', 'El usuario ya existe'))
                    
                }
                else{
                    console.log('entro al else')
                    const newUser = new User()
                    newUser.local.user = user
                    newUser.local.password =newUser.generateHash(password)
                    newUser.save(function(err)
                    {
                        if(err)
                        {
                            console.log('entro al if del error')
                            {throw err}
                            
                        }
                        else{

                            console.log('entro al else de error')
                            return done(null,newUser)
                        }
                    })
                }
            })
        }
    ))


    //login

    passport.use('local-login', new localStrategy(
        {
            usernameField: 'user',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, user, password, done)
        {
            User.findOne({'local.user':user}, function(err, acount)
            {
                if(err){

                    console.log('entro al primer if error')
                    return done(err)
                }
                if(!acount)
                {
                    console.log('Entro al segundo if no existe el usuario')
                    return done(null, false, req.flash('loginMessage ', 'El usuario no a sido encontrado'))
                }
                if(!acount.validPassword(password))
                {
                    console.log('entro al tercer if password equivocado')
                    return done(null, false, req.flash('loginMessage', ' Wrong password'))
                }
                else
                {
                    console.log('entro al else en teoria todo bien')
                    return done(null, acount)
                }
                
            })
        }
    ))

}
