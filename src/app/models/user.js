const mongoose = require('mongoose')

const bcrypt = require('bcrypt-nodejs')



const userSchema = new mongoose.Schema
(
    {
        local:
        {
            user: String,
            password: String
        }
       /* ,
        facebook:
        {
            email: String,
            password: String,
            id: String,
            token: String
        },
        twitter:
        {
            email: String,
            password: String,
            id: String,
            token: String
        },
        google:
        {
            email: String,
            password: String,
            id: String,
            token: String
        }*/
    }
)
//Cifrado de password
userSchema.methods.generateHash = function(password)
{
    console.log('encriptando')
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function(password)
{
    console.log('validando')
    return bcrypt.compareSync(password, this.local.password)
}


module.exports = mongoose.model('User', userSchema)


