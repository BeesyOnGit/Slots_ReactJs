const mongoose = require ('mongoose')
const validator= require ( 'validator')
const Gamemodel = new mongoose.Schema({
    Game_name:{
        type: String,
    },

    Player_id:{
        type: String,
    },
    Username:{
        type: String,
    },

    Result_number:{
        
    },

    Game_result:{
        game_status:{
            type: String
        },
        Bet:{
            type: String,
        },
        Multiplier:{
            type: String,
        },
        Won_amount:{
            type: String,
        },
        lost_amount:{
            type: String
        }
    },

    Game_date: {
        type: String,
        default: new Date().toLocaleString("fr-FR")
    },
})

module.exports = new mongoose.model('GameStats', Gamemodel);