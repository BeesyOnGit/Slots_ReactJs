const mongoose = require ('mongoose')
const validator= require ( 'validator')
const Machinemodel = new mongoose.Schema({
    
    Machine_name:{
        type: String,
        unique: true
    },

    Total_Played:{
        type: Number,
        default:0
    },

    Played_since_win:{
        type: Number,
        default:0
    },

    Total_win:{
        type: Number,
        default:0
    },
    Total_lose:{
        type: Number,
        default:0
    },

})

module.exports = new mongoose.model('Game_Machines', Machinemodel);