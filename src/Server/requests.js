import axios from "axios";

const baseURL='http://localhost:3000'

export async function Identification(typ,userinf) {
    if (typ == "register") {
        try {
            const res = await axios.post(`${baseURL}/register`,{
                username : userinf.uname,
                email : userinf.mail,
                password : userinf.pass
            })
            if (res.data.status == "success" ) {
                return({status:'success',message:"Account created Successfully You can now login"})
                
            }
            
        } catch (err) {
            if (err.response.status == 403 && err.response.data.message == 'Username Already exists') {
                return({status:'failedcode1',message: err.response.data.message})
            }
            if (err.response.status == 403 && err.response.data.message == 'E-mail Already exists') {
                return({status:'failedcode1',message: err.response.data.message})
            }
            
        }
        
    }
    else if (typ == "login") {
        try {
            const res = await axios.post(`${baseURL}/login`,{
                id : userinf.uname,
                password : userinf.pass
            })
            if (res.data.status == "successregular" ) {
                return({status:'successregular',message: res.data.message, token: res.data.token,PP: res.data.PP})
                
            }
            if (res.data.status == "successadmin" ) {
                return({status:'successadmin',message: res.data.message, token: res.data.token,PP: res.data.PP})
                
            }
            if (res.data.status == "error403" ) {
                return({status:'error403',message: res.data.message})
                
            }
            
        } catch (err) {
            if (err.response.status == 404) {
                return({status:'error404',message: err.response.data.message})
                
            }
            
        }
    }
    
}

export async function getinfo(token) {
    try {
        const res = await axios.get(`${baseURL}/infos/${token}`)
        if (res.data.status == "success" ) {
            return({userinfo : res.data.infos})
        }
        if (res.data.status == "error" ) {
            return(console.log("Failed to get user information because he doesn't existe"))
        }
        
    } 
    catch (err) {
        console.log(err);
    }
    
}

export async function getuserinfo(token) {
    try {
        const res = await axios.get(`${baseURL}/infos/user/${token}`)
        if (res.data.status == "success" ) {
            return(res.data.data)
        }
        if (res.data.status == "error" ) {
            return(console.log("Failed to get user information because he doesn't existe"))
        }
        
    } 
    catch (err) {
        console.log(err);
    }
    
}

export async function slotsreq(typ,bet,token) {
    if (typ == "3") {
        try {
            const res = await axios.post(`${baseURL}/play-3-slots`,{
                bet: bet.bet,
                multiplier: bet.multiplier,
                token: token
            })
            if (res.status == 200) {
                return({data:res.data})
            }    
        } 
        catch (error) {
            console.log(error);
        }
    }
    if (typ == "4") {
        try {
            const res = await axios.post(`${baseURL}/play-4-slots`,{
                bet: bet.bet,
                multiplier: bet.multiplier,
                token: token
            })
            if (res.status == 200) {
                return({data:res.data})
            }    
        } 
        catch (error) {
            console.log(error);
        }
    }
}

export async function stdEditRequest(type,token,data) {
    
    if (type =="Darkmode") {
        try {
            const res = await axios.post(`${baseURL}/editdarkmode/${token}`,{
                data
            })    
            if (res) {
                return(res)
            }
        } 
        catch (error) {
            console.log(error);
            
        }
        
    }
    if (type =="std") {
        
        try {
            const res = await axios.post(`${baseURL}/edit/${token}`,{
                data
            })    
            if (res) {
                return(res)
            }
        } 
        catch (error) {
            console.log(error);
            
        }
    }
}

export async function stats(token) {
    try {
        const res = await axios.get(`${baseURL}/stats/${token}`)
        if (res) {

            return(res.data.data)

        }
    } 
    catch (error) {
    }
}