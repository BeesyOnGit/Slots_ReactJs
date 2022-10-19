const express = require( 'express');
const bodyParser = require( 'body-parser');
const jwt = require( 'jsonwebtoken')
const http = require( 'http')
const cors = require( 'cors')
const app = express();
const mongoose = require( 'mongoose');
const usermodel = require( './models/usermodel.js')
const Gamestats = require( './models/Gamestats_model.js')
const Machinemodel = require( './models/Machinemodel.js')
const Gamestats_model = require( './models/Gamestats_model.js');
const { json } = require('express/lib/response');
let Coef3slot = 5 , Coef4slot = 10
http.createServer(app)

mongoose.connect('mongodb://localhost:27017')
.then(()=>{
    console.log('Database connected')
})
.catch(err =>{
    console.error(err)
})
//app.use(bodyParser.json())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors({origin: "*"}))

/**************************************************- Sign up -***************************************************************************** */
app.post('/register',(req,res) =>{

    usermodel(req.body).save()
    .then( user => {
        res.status(200).json({"status" : "success", "message" : "Registered succefully"})
    })
    .catch(err =>{
        if (err.keyValue.username == req.body.username) {
            const mess = "Username Already exists"
            res.status(403).json({"status":"error","message":mess})
            
        } 
        if (err.keyValue.email == req.body.email) {
            const mess = "E-mail Already Used"
            res.status(403).json({"status":"error","message":mess})
        }
        console.error(err);
    })


})

/*****************************************************- Login -************************************************************************** */

app.post('/login', (req,res) =>{
    const reqid = req.body.id
    const reqpassword = req.body.password
    usermodel.find({$or:[{email : reqid},{username : reqid}]})
    .then(user =>{
        const pass = user[0].password
        const admin = user[0].Admin_status
        const username = user[0].username
        const {Profil_picture:PP} = user[0]

        if(reqpassword != pass){
            res.status(403).json({status:'error403',message: 'Wrong password'})
        }
        if (reqpassword == pass && admin == "0") {
            const token = jwt.sign({username: username}, "Slotsauthlogin")
            res.status(200).json({status:'successregular',message:'Login succesfull', token : token, PP:PP})
            
        }
        else if (reqpassword == pass && admin == "1") {
            const token = jwt.sign({username: username}, "Slotsauthlogin")
            res.status(200).json({status:'successadmin',message:'Login succesfull as Admin', token: token,PP:PP})

        }
        
        })
    .catch(err =>{
        res.status(404).json({'status':'error404','message':'Unknown user'})

    })
})
/******************************************************- Profile-********************************************************************************** */
app.get('/infos/:token', async (req,res) =>{
    const token = req.params.token
    const userid = jwt.verify(token, "Slotsauthlogin").username
    const filter ={username : userid}
    try {
       const user= await usermodel.find(filter)
       const filtereduser = {
           username : user[0].username,
           Balance : user[0].Balance,
           Admin_status : user[0].Admin_status,
           Darkmode : user[0].Darkmode,
        }
       if (filtereduser) {
           res.status(200).json({status:'success',infos : filtereduser})
       }
       else{
           res.status(404).json({status:'error',infos : "Failed to find user"})
       }
        
    } 
    catch (error) {
        console.error(error);
    }

})
app.get('/infos/user/:token', async (req,res) =>{
    const token = req.params.token
    const userid = jwt.verify(token, "Slotsauthlogin").username
    const filter ={username : userid}
    try {
       const user= await usermodel.find(filter)
       const filtereduser = {
        email: user[0].email,
        firstname: user[0].firstname,
        lastname: user[0].lastname,
        birthdate: user[0].birthdate,
        Phone: user[0].Phone,
        Profil_picture:user[0].Profil_picture,
        adress:
        {
            postalcode :user[0].adress.postalcode,
            street :user[0].adress.street,
            country :user[0].adress.country,
            city :user[0].adress.city
        }
        }
       if (filtereduser) {
           res.status(200).json({status:'success',data : filtereduser})
       }
       else{
           res.status(404).json({status:'error',infos : "Failed to find user"})
       }
        
    } 
    catch (error) {
        console.error(error);
    }

})

app.post('/edit/:token', async (req,res)=>{
    const token = req.params.token
    const userid = jwt.verify(token, "Slotsauthlogin").username
    const filter ={username : userid}
    const {password,...update} = req.body.data

    try {
        const userexiste= await usermodel.find(filter)
        if (userexiste) {
            const {password:userpassword}= userexiste[0]
            if (userpassword == password) {
                const user= await usermodel.findOneAndUpdate(filter, update)
                if (user) {
                    const{password,Player_stats,Admin_status,Darkmode,join_date,Balance,...userrest}=user
                    res.status(200).json({status:'Success',message : "Informations Updated successfully", data:userrest})   
                }
            }
            else if (userpassword != password) {
                res.json({status:'WrongPassword',message : "Wrong password, Updates failed"})
            }

            
        }
    } 
    catch (error) {
        console.log(error);
    }

})

app.post('/editdarkmode/:token', async (req,res)=>{
    const token = req.params.token
    const userid = jwt.verify(token, "Slotsauthlogin").username
    const filter ={username : userid}
    const {Darkmode} = req.body.data
    const Darkmodeupdate = {Darkmode:Darkmode}
    try {
        const userexiste= await usermodel.find(filter)
        if (userexiste) {
            const user= await usermodel.findOneAndUpdate(filter, Darkmodeupdate)
            const {Darkmodeuser} = user 
            if (user) {
                res.status(200).json({status:'Success', Darkmode : Darkmodeuser})   
            }
        }
    } 
    catch (error) {
        console.log(error);
    }
})

app.get('/stats/:token', async (req,res) =>{
    const token = req.params.token
    const userid = jwt.verify(token, "Slotsauthlogin").username
    const filter ={username : userid}
    const filterstat ={$and:[{username : userid},{"Game_result.game_status":"Won"}]}
    try {
       const user= await usermodel.find(filter)
       if (user) {
           const{Player_stats:Pstat,Balance,username}=user[0]
           const{played_games,won}=Pstat
           const games = await Gamestats.find(filter)
           if (games) {
               const lastfivegames = games.slice(Math.max(games.length - 5, 0))
               const Wongames = await Gamestats.find(filterstat)
               let Totalwon
               const  Wamount =()=>{
                   let tmp =0
                   Totalwon = Wongames.forEach(game => {
                       tmp = parseInt(game.Game_result.Won_amount) + tmp
                   });
                   return(tmp)
                }
               Totalwon= await Wamount()
               const data={
                   username:username,
                   Balance:Balance,
                   played_games:played_games,
                   won:won,
                   Totalwon:Totalwon,
                   lastfivegames:lastfivegames
               }
                res.json({status:'success',data:data})

            }
            else{

                res.json({status:'Nogames',data:0})
            }
        }
        else{
            res.json({status:'error',data : "Failed to find user"})
            
        }
        
    } 
    catch (error) {
        console.error(error);
    }

})


/******************************************************- Profile-********************************************************************************** */
app.get('/Profile/:username', (req,res) =>{
    const filter ={username : req.params.username}
    const filtergames ={Player_id : req.session.user_id}
    if (req.session.user_id) {
        const gs = Gamestats.find(filtergames)
        const doc = usermodel.find(filter)
        doc.then(users =>{
            const user = users[0]
            gs.then(games =>{
                let wamount = 0
                for (const game of games) {
                    if (game.Game_result.game_status == "Won") {
                        wamount = parseInt(game.Game_result.Won_amount) + wamount
                    }
                }
                res.status(200).render('Profile',{user ,games, wamount })
            })
            .catch(err =>{
                console.error(err);
            })
        })
        .catch(err =>{
        })
    }
    else{
        res.status(403).json('You must have an account to Access The profile')
    }
})

app.post('/Profile/:id/credentialsedit', (req,res) =>{
    const filter ={_id : req.params.id}
    const refpass = req.body.refpass
    const passcnfirm = req.body.passwordconfirmation
    if (req.session.user_id) {
        const doc = usermodel.find(filter)
        doc.then(user =>{

            if (refpass != user[0].password) {
                res.status(403).json('Current password Is Wrong')
            }
            if (passcnfirm != req.body.password) {
                res.status(403).json('Password confirmation Is Wrong')
            }
            if( refpass == user[0].password && passcnfirm =="" && passcnfirm == req.body.password ){
                user[0].email = req.body.email
                user[0].username = req.body.username
                user[0].save()
                .then(users =>{
                    res.status(200).json('Credentials updated successfully')
                })
                .catch(err =>{

                })
            }
            if( refpass == user[0].password && passcnfirm == req.body.password && passcnfirm != ""){
                user[0].email = req.body.email
                user[0].username = req.body.username
                user[0].password = req.body.password
                user[0].save()
                .then(users =>{
                    res.status(200).json('Credentials updated successfully')
                })
                .catch(err =>{

                })
            }
        })
        .catch(err =>{
        })
    }
})

app.post('/Profile/:id/userinfosedit', (req,res) =>{
    const filter ={_id : req.params.id}
    if (req.session.user_id) {
        const doc = usermodel.find(filter)
        doc.then(user =>{
            user[0].adress.street = req.body.street
            user[0].adress.postalcode = req.body.postalcode
            user[0].adress.city = req.body.city
            user[0].adress.country = req.body.country
            user[0].birthdate = req.body.birthdate
            user[0].Phone = req.body.Phone
            user[0].lastname = req.body.lastname
            user[0].firstname = req.body.firstname
            user[0].save()
            .then(users =>{
                res.status(200).json({response :'Personal informations updated successfully', username: users.username})
            })
            .catch(err =>{
                console.error(err);
            })
        })
        .catch(err =>{
            console.error(err);
        })
    }
})

/****************************************************--3 Slots machine--*************************************************************************** */

app.post('/play-3-slots',async (req,res) =>{
    const Bet = req.body.bet
    const Multiplier = req.body.multiplier
    const token = req.body.token
    const {username:userid} = jwt.verify(token, "Slotsauthlogin")
    const filter ={username : userid}
    const filtermachine ={Machine_name : "3 Slots Machine"}
    const playtolerance = getRandomNumber(287,230)
    const Coef3slotwin = Coef3slot*Multiplier
    const total = Bet*Coef3slotwin
    
    try {
        const user = await usermodel.findOne(filter)
        if (user) {
            const nums = SlotsSpin(3)
            const userid = user.id
            const username = user.username
            let num1 = nums[0]
            let num2 = nums[1]
            let num3 = nums[2]
            const deter = nums[3]
            
            
            const machine = await Machinemodel.findOne(filtermachine)
            if (user && machine) {
                //console.log(machine);
                //console.log(user);
                let PG = user.Player_stats.played_games
                let PL = user.Player_stats.lost
                let PW = user.Player_stats.won
                let MTP = machine.Total_Played
                let MTL = machine.Total_lose
                let MTW = machine.Total_win
                let MPSW = machine.Played_since_win
                let Balanceuser = user.Balance
                if (MPSW >= playtolerance) {
                    if (deter == 1) {
                        num2 = num1
                        num3 = num1
                    }
                }
                if (num1 == num2 && num1 == num3) {
                    const Gswin = {
                        Game_name:"3 Slots Machine", 
                        Player_id: userid, 
                        Username : username,
                        Result_number:[num1,num2,num3],
                        Game_result:{game_status:"Won",Bet:Bet,Multiplier:Multiplier,Won_amount: total}
                    }
                    Gamestats(Gswin).save()
                    user.Player_stats.won = PW +1
                    user.Player_stats.played_games = PG +1
                    user.Balance = Balanceuser + total
                    user.save()
                    machine.Total_Played = MTP + 1
                    machine.Total_win = MTW +1
                    machine.Played_since_win = 0
                    machine.save()
                    res.status(200).json({numbers:[num1,num2,num3],Played:0,comment:"You Won!"})
                }
                else{
                    const Gslose = {
                        Game_name:"3 Slots Machine", 
                        Player_id: userid,
                        Username :username,
                        Result_number:[num1,num2,num3],
                        Game_result:{game_status:"Lost",Bet:Bet,Multiplier:Multiplier,lost_amount: total/Coef3slot}
                    }
                    Gamestats(Gslose).save()
                    user.Player_stats.lost = PL +1
                    user.Player_stats.played_games = PG +1
                    user.Balance = Balanceuser - (total/Coef3slot)
                    if (user.Balance <= 0) {
                        user.Balance = 0
                    }
                    user.save()
                    machine.Total_Played = MTP + 1
                    machine.Total_lose = MTL +1
                    machine.Played_since_win = MPSW + 1
                    machine.save()
                    res.status(200).json({numbers:[num1,num2,num3],comment:"You Lost!"})
                }
            }

           

        }
        else{
            res.status(404).json('You must have an account to play this Game')
        }
    } 
    catch (error) {
        console.log(error);
        res.status(404).json('You must have an account to play this Game')
    }
    

})
/***************************************************-- 4 Slots Machine --******************************************************** */

app.post('/play-4-slots',async (req,res) =>{
    const Bet = req.body.bet
    const Multiplier = req.body.multiplier
    const token = req.body.token
    const userid = jwt.verify(token, "Slotsauthlogin").username
    const filter ={username : userid}
    const filtermachine ={Machine_name : "4 Slots Machine"}
    const playtolerance = getRandomNumber(287,230)
    const Coef4slotwin = Coef4slot*Multiplier
    const total = Bet*Coef4slotwin
    
    try {
        const user = await usermodel.findOne(filter)
        if (user) {
            const nums = SlotsSpin(4)
            const userid = user.id
            const username = user.username
            let num1 = nums[0]
            let num2 = nums[1]
            let num3 = nums[2]
            let num4 = nums[3]
            const deter = nums[4]
            
            
            const machine = await Machinemodel.findOne(filtermachine)
            if (user && machine) {
                //console.log(machine);
                //console.log(user);
                let PG = user.Player_stats.played_games
                let PL = user.Player_stats.lost
                let PW = user.Player_stats.won
                let MTP = machine.Total_Played
                let MTL = machine.Total_lose
                let MTW = machine.Total_win
                let MPSW = machine.Played_since_win
                let Balanceuser = user.Balance
                if (MPSW >= playtolerance) {
                    if (deter == 1) {
                        num2 = num1
                        num3 = num1
                        num4 = num1
                    }
                }
                if (num1 == num2 && num1 == num3 && num1 == num4) {
                    const Gswin = {
                        Game_name:"4 Slots Machine",
                        Player_id: userid,
                        Username :username,
                        Result_number:[num1,num2,num3,num4],
                        Game_result:{game_status:"Won",Bet:Bet,Multiplier:Multiplier,Won_amount: total}
                    }
                    Gamestats(Gswin).save()
                    user.Player_stats.won = PW +1
                    user.Player_stats.played_games = PG +1
                    user.Balance = Balanceuser + total
                    user.save()
                    machine.Total_Played = MTP + 1
                    machine.Total_win = MTW +1
                    machine.Played_since_win = 0
                    machine.save()
                    res.status(200).json({numbers:[num1,num2,num3,num4],comment:"You Won!"})
                    
                }
                else{
                    const Gslose = {
                        Game_name:"4 Slots Machine", 
                        Player_id: userid,
                        Username :username,
                        Result_number:[num1,num2,num3,num4],
                        Game_result:{game_status:"Lost",Bet:Bet,Multiplier:Multiplier,lost_amount: total/Coef4slot}
                    }
                    Gamestats(Gslose).save()
                    user.Player_stats.lost = PL +1
                    user.Player_stats.played_games = PG +1
                    user.Balance = Balanceuser - total/Coef4slot
                    if (user.Balance <= 0) {
                        user.Balance = 0
                    }
                    user.save()
                    machine.Total_Played = MTP + 1
                    machine.Total_lose = MTL +1
                    machine.Played_since_win = MPSW + 1
                    machine.save()
                    res.status(200).json({numbers:[num1,num2,num3,num4],comment:"You Lost!"})
                }
            }

        }
        else{
            res.status(404).json('You must have an account to play this Game')
        }
    } 
    catch (error) {
        
    }

    
})
/******************************************************************************************************************************* */
app.post('/logout' ,(req, res) =>{
    req.session.destroy();
    res.status(200).json("/")

})

/********************************************************--ADMIN DASHBOARD--********************************************************* */
app.get('/Admin_dashboard', async (req, res) =>{
    if (req.session.user_id) {
        const filter ={_id : req.session.user_id}
        try {
            const user = await usermodel.findOne(filter)
            const users = await usermodel.find()
            const games = await Gamestats_model.find({"Game_result.game_status":"Won"})
            console.log(games);
            if (user.Admin_status == 1) {
                res.status(200).render('Admin_dash', {user, users, games, Coef3slot, Coef4slot})
            }    
        } 
        catch (err) {
            console.error(err);
            
        }
    }
    else{
        res.status(403).json("You don't have acces de this section")
    }
})

/******************************************************************************************************************************* */
app.listen(3000,()=>{
    console.log("Server live on port 3000")
})



/****************************************************FUNCTIONS***************************************************************** */

function getRandomNumber(x,y) {
    return Math.floor(Math.random()*(x-(y-1))) + y;
}

function SlotsSpin(n) {
    let nums =[]
    for (let i = 0; i < n ; i++) {
        nums[i] = getRandomNumber(7,1);
    }
    let deter = getRandomNumber(5,1); 
    nums.splice(n,0,deter)
    return nums
    
}

/* const Mailjet from 'node-mailjet'

  const mailjet = Mailjet.apiConnect(
    '1e2de513c60b1917e948228ef7796a00',
    '0fc2f38b66d51f8586914bc0d9d9a1c6'
);
const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "tajodec904@lutota.com",
        "Name": "ramen"
      },
      "To": [
        {
          "Email": "tajodec904@lutota.com",
          "Name": "ramen"
        }
      ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": "My first Mailjet email",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err)
  }) */

