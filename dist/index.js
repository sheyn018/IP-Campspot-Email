"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();
const app = express();
// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'stolentino@insiderperks.com',
        pass: process.env.EMAIL_PASSWORD
    }
});
// Existing route handler
app.get("/", (req, res) => res.send("Express on Vercel"));
// New route handler for sending email
app.get("/send-mail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { userName, email } = req.query;
        // Decode the URI-encoded values
        userName = decodeURIComponent(userName);
        email = decodeURIComponent(email);
        // Send the email
        const info = yield transporter.sendMail({
            from: 'Insider Perks <stolentino@insiderperks.com>',
            to: email,
            subject: '[Open Link] Book Your Stay',
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to the Resort</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 10px;
                        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .header h1 {
                        color: #444444;
                    }
                    .content {
                        color: #666666;
                        line-height: 1.6;
                    }
                    .cta-button {
                        display: inline-block;
                        background-color: #0056b3;
                        color: #ffffff;
                        padding: 12px 24px;
                        text-decoration: none;
                        border-radius: 25px;
                        transition: background-color 0.3s;
                    }
                    .cta-button:hover {
                        background-color: #004494;
                    }
                    .social-section {
                        margin-top: 40px;
                        text-align: center;
                    }
                    .social-section img {
                        margin: 0 10px;
                    }
                </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <img src="https://st2.depositphotos.com/1768926/7866/v/450/depositphotos_78666192-stock-illustration-a-logo-sample-logo-for.jpg" alt="logo" width="30%" height="30%">
                            <h1>Welcome to the Resort</h1>
                        </div>
                        <div class="content">
                            <p>Hello <strong>${userName}</strong>!</p>
                            <p>Please click on the link below to start your booking process!</p>
                            <div style="text-align: center; margin-top: 20px;">
                                <a href="https://www.campspot.com/book/verderanchrvresort?&utm_source=google&utm_medium=organic&utm_campaign=&utm_content=&utm_keyword=&wc_visitor=97982-a2b7ba9d-ef04-f3b7-2d13-575d87c34ac5&_gl=1*1pvj1bz*_gcl_au*NzY4MzUzNDgyLjE3MTY0NzY2MjM.*_ga*MTU3MDAxNDE4Ni4xNzE2NDc2NjI0*_ga_7G3LYDC0B2*MTcxNzUwMzM3My4yLjEuMTcxNzUwMzM5OC4zNS4wLjA." class="cta-button" style="display: inline-block; background-color: #0056b3; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 25px; transition: background-color 0.3s;">Book Now</a>
                            </div>
                        </div>
                        <div class="social-section">
                            <hr style="border: 0; height: 1px; background-color: #dddddd; margin-bottom: 20px;">
                            <p style="font-size: 16px; margin-bottom: 10px;">Let's get social</p>
                            <a href="https://www.facebook.com">
                                <img src="https://cdn.jsdelivr.net/gh/dmhendricks/signature-social-icons/icons/round-flat-filled/50px/facebook.png" alt="Facebook" title="Facebook" width="25" height="25" />
                            </a>
                            <a href="https://www.instagram.com">
                                <img src="https://cdn.jsdelivr.net/gh/dmhendricks/signature-social-icons/icons/round-flat-filled/50px/instagram.png" alt="Instagram" title="Instagram" width="25" height="25" />
                            </a>
                            <a href="https://www.linkedin.com">
                                <img src="https://cdn.jsdelivr.net/gh/dmhendricks/signature-social-icons/icons/round-flat-filled/50px/linkedin.png" alt="LinkedIn" title="LinkedIn" width="25" height="25" />
                            </a>
                        </div>
                    </div>
                </body>
                </html>`
        });
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
    }
    catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
}));
app.listen(3001, () => console.log("Server ready on port 3001."));
module.exports = app;
