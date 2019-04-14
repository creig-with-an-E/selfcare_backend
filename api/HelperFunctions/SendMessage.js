/*
to send message import class and create instance then reference the send method
*/

const nodemailer = require('nodemailer')
const {google } = require("googleapis")
const OAuth2 = google.auth.OAuth2
const dotenv = require('dotenv').config();

class EmailHelper{
    constructor(){
         this.oauth2Client = new OAuth2(
            process.env.api_clientId,     //clientId
            process.env.api_secret, // Client Secret
            "https://developers.google.com/oauthplayground" 
        )
        this.oauth2Client.setCredentials({
            refresh_token: process.env.api_refreshToken
        }); 

        this.accessToken = null
         this.tokens = async()=> await oauth2Client.refreshAccessToken((tokens)=>accessToken = tokens.credentials.access_token)

         this.smtpTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                 type: "OAuth2",
                 user: process.env.api_userId, 
                 clientId: process.env.api_clientId,
                 clientSecret: process.env.api_secret,
                 refreshToken: process.env.api_refreshToken,
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