const mongoose = require ('mongoose')
const validator= require ( 'validator')
const Usermodel = new mongoose.Schema({
    
    username:{
        type: String,
        required: true,
        unique: true,
        validator: (v) =>{
            return validator.isLength(v,{min :2, max: 10})
        }
        
    },
    
    Balance: {
        type: Number,
        required: true,
        default: 10,
    },
    
    email:{
        type: String,
        required: true,
        unique: true,
        validator: (v) =>{
            return validator.isEmail(v)
        }
        
    },
    
    password:{
        type: String,
        required: true,
        validator: (v) =>{
            return validator.isStrongPassword(v)
        }

    },

    Player_stats:{
        played_games:{
            type: Number,
            default:0
        },
        won:{
            type: Number,
            default:0
        },
        lost:{
            type: Number,
            default:0
        },
    },
    
    firstname:{
        type: String,
        validator: (v) =>{
            return v.length >2
        },
        default: ""
        
    },

    lastname:{
        type: String,
        validator: (v) =>{
            return v.length >2
        },
        default: ""

    },
    
    birthdate:{
        type: String,
        validator: (v) =>{
            return v.length >2
        },
        default: ""
        
    },

    adress:{
        country:{
            type: String,
            default: ""
        },
        city:{
            type: String,
            default: ""
        },
        postalcode:{
            type: String,
            default: ""
        },
        street:{
            type: String,
            default: ""
        },
        
    },

    Phone:{
        type: String,
        validator: (v) =>{
            return validator.isMobilePhone(v)
        },
        default: ""
        
    },


    join_date: {
        type: String,
        default: new Date().toLocaleString("fr-FR")
    },

    Admin_status: {
        type: Boolean,
        default: false
    },
    
    Profil_picture:{
        type: String,
        
    },

    Darkmode:{
        type: Boolean,
        default: false
    }
    
    
})

module.exports = new mongoose.model('Userssite', Usermodel);