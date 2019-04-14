const nodemailer = require('nodemailer')
const {google } = require("googleapis")
const OAuth2 = google.auth.OAuth2

class EmailHelper{
    constructor(){
         this.oauth2Client = new OAuth2(
            "737516009060-di72v3ve7sp4k3056c3md06atqr1q9bq.apps.googleusercontent.com",     //clientId
            "9H-nhoM-vjxeg-jk-7AdAipp", // Client Secret
            "https://developers.google.com/oauthplayground" 
        )
        this.oauth2Client.setCredentials({
            refresh_token: "1/BM1KQ_PL6o1ln9RScieJGaDaI82RTLYzuSay5B2aqpyS6dW_whXYywSncsnjtPO7"
        }); 

        this.accessToken = null
         this.tokens = async()=> await oauth2Client.refreshAccessToken((tokens)=>accessToken = tokens.credentials.access_token)

         this.smtpTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                 type: "OAuth2",
                 user: "the.selfcareapp@gmail.com", 
                 clientId: "737516009060-di72v3ve7sp4k3056c3md06atqr1q9bq.apps.googleusercontent.com",
                 clientSecret: "9H-nhoM-vjxeg-jk-7AdAipp",
                 refreshToken: "1/BM1KQ_PL6o1ln9RScieJGaDaI82RTLYzuSay5B2aqpyS6dW_whXYywSncsnjtPO7",
                 accessToken: this.accessToken
            }
            });
    }

      sendNewAccountEmail(sendTo){
         console.log("sending message")
         let mailOptions = {
            from: "the.selfcareapp@gmail.com",
            to: sendTo,
            subject: "Welcome to self care the app",
            generateTextFromHTML: true,
            html: "<b>Thank you for enrolling for self care app</b>"
        };
           return new Promise((resolve,reject)=>{
               this.smtpTransport.sendMail(mailOptions, (error, response) => {
                if(error){
                    this.smtpTransport.close();
                    reject("error")
                }else{
                    console.log(response)
                    this.smtpTransport.close();
                    resolve("result")
                }
            })
  
        })
    }
}

module.exports = EmailHelper