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
        user: 'znekoshiro@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});
// Existing route handler
app.get("/", (req, res) => res.send("Express on Vercel"));
// New route handler for sending email
app.get("/send-mail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { userName, email, url } = req.query;
        // Decode the URI-encoded values
        userName = decodeURIComponent(userName);
        email = decodeURIComponent(email);
        url = url;
        // Send the email
        const info = yield transporter.sendMail({
            from: 'Development Test <znekoshiro@gmail.com>',
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
                        background-color: #e9ecef;
                    }
                    .container {
                        max-width: 800px;
                        margin: 40px auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 10px;
                        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: left;
                        margin-bottom: 30px;
                    }
                    .header img {
                        width: 20%;
                        height: auto;
                    }
                    .header h1 {
                        color: #333333;
                        margin: 0;
                        padding-left: 20px;
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .content {
                        color: #555555;
                        line-height: 1.8;
                        margin-bottom: 30px;
                    }
                    .cta-button {
                        display: inline-block;
                        background-color: #0056b3;
                        color: #ffffff;
                        padding: 14px 28px;
                        text-decoration: none;
                        border-radius: 30px;
                        transition: background-color 0.3s;
                    }
                    .cta-button:hover {
                        background-color: #004494;
                    }
                    .social-section {
                        text-align: center;
                    }
                    .social-section img {
                        margin: 0 15px;
                    }
                    hr {
                        border: 0;
                        height: 1px;
                        background-color: #dddddd;
                        margin: 40px 0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://st2.depositphotos.com/1768926/7866/v/450/depositphotos_78666192-stock-illustration-a-logo-sample-logo-for.jpg" alt="logo">
                        <h1>Welcome to the Resort</h1>
                    </div>
                    <div class="content">
                        <p>Hello <strong>${userName}</strong>!</p>
                        <p>We're thrilled to have you with us! Our resort offers the perfect blend of luxury and relaxation, ensuring an unforgettable experience for all our guests. We are excited to assist you in starting your booking process and making your stay with us extraordinary.</p>
                        <p>To begin your journey, please click on the link below:</p>
                        <div style="text-align: center; margin-top: 20px;">
                            <a href="${url}" class="cta-button" style="display: inline-block; background-color: #0056b3; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 25px; transition: background-color 0.3s;">Book Now</a>
                        </div>
                    </div>
                    <hr>
                    <div class="social-section">
                        <p style="font-size: 16px; margin-bottom: 20px;">Visit Us On Social Media</p>
                        <a href="https://www.facebook.com">
                            <img src="https://cdn.jsdelivr.net/gh/dmhendricks/signature-social-icons/icons/round-flat-filled/50px/facebook.png" alt="Facebook" title="Facebook" width="30" height="30" />
                        </a>
                        <a href="https://www.instagram.com">
                            <img src="https://cdn.jsdelivr.net/gh/dmhendricks/signature-social-icons/icons/round-flat-filled/50px/instagram.png" alt="Instagram" title="Instagram" width="30" height="30" />
                        </a>
                        <a href="https://www.linkedin.com">
                            <img src="https://cdn.jsdelivr.net/gh/dmhendricks/signature-social-icons/icons/round-flat-filled/50px/linkedin.png" alt="LinkedIn" title="LinkedIn" width="30" height="30" />
                        </a>
                    </div>
                </div>
            </body>
            </html>
            `
        });
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
    }
    catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
}));
// New route handler for sending email
app.get("/send-userinfo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { userInfo, siteInfo } = req.query;
        // Decode the URI-encoded values
        userInfo = JSON.parse(decodeURIComponent(userInfo));
        siteInfo = JSON.parse(decodeURIComponent(siteInfo));
        // Function to set default values if null, undefined, or an empty string
        const getValueOrDefault = (value, defaultValue) => {
            return (value === null || value === undefined || value === '') ? defaultValue : value;
        };
        // User Info
        const email = getValueOrDefault(userInfo.email, '--Not Set--');
        const guestName = getValueOrDefault(userInfo.name, '--Not Set--');
        const checkinDate = getValueOrDefault(userInfo.checkin, '--Not Set--');
        const checkoutDate = getValueOrDefault(userInfo.checkout, '--Not Set--');
        const adults = getValueOrDefault(userInfo.adults, '--Not Set--');
        const children = getValueOrDefault(userInfo.children, '--Not Set--');
        const pets = getValueOrDefault(userInfo.pets, '--Not Set--');
        const billingAddress = getValueOrDefault(userInfo.billAddress, '--Not Set--');
        console.log(billingAddress);
        const phoneNumber = getValueOrDefault(userInfo.phone, '--Not Set--');
        // Site Info
        const siteType = getValueOrDefault(siteInfo.siteType, '--Not Set--');
        const siteName = getValueOrDefault(siteInfo.siteName, '--Not Set--');
        const siteAddress = getValueOrDefault(siteInfo.siteAddress, '--Not Set--');
        const siteContact = getValueOrDefault(siteInfo.siteContact, '--Not Set--');
        const siteAmenities = getValueOrDefault(siteInfo.siteAmenities, ['--Not Set--']).join(', ');
        const sitePrice = getValueOrDefault(siteInfo.sitePrice, '--Not Set--');
        const lockSite = getValueOrDefault(siteInfo.lockSite, '--Not Set--');
        const totalPrice = getValueOrDefault(siteInfo.totalPrice, '--Not Set--');
        // If RV site, include RV details
        let rvDetails = '';
        if (siteType === 'rv') {
            const rvLength = getValueOrDefault(siteInfo.length, '--Not Set--');
            const rvSlideout = getValueOrDefault(siteInfo.slideouts, '--Not Set--');
            const rvType = getValueOrDefault(siteInfo.type, '--Not Set--');
            rvDetails = `
                <h3>RV Details:</h3>
                <ul>
                    <li><strong>RV Length:</strong> ${rvLength}</li>
                    <li><strong>RV Slideouts:</strong> ${rvSlideout}</li>
                    <li><strong>RV Type:</strong> ${rvType}</li>
                </ul>`;
        }
        // Send the email
        const info = yield transporter.sendMail({
            from: 'Development Test <znekoshiro@gmail.com>',
            to: email,
            subject: '[Booking Request] Assist in Booking the Site',
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Booking Request</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #e9ecef;
                    }
                    .container {
                        max-width: 800px;
                        margin: 40px auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 10px;
                        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: left;
                        margin-bottom: 30px;
                    }
                    .header img {
                        width: 20%;
                        height: auto;
                    }
                    .header h1 {
                        color: #333333;
                        margin: 0;
                        padding-left: 20px;
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .content {
                        color: #555555;
                        line-height: 1.8;
                        margin-bottom: 30px;
                    }
                    .content ul {
                        list-style-type: none;
                        padding: 0;
                    }
                    .content ul li {
                        margin-bottom: 10px;
                    }
                    .cta-button {
                        display: inline-block;
                        background-color: #0056b3;
                        color: #ffffff;
                        padding: 14px 28px;
                        text-decoration: none;
                        border-radius: 30px;
                        transition: background-color 0.3s;
                    }
                    .cta-button:hover {
                        background-color: #004494;
                    }
                    .social-section {
                        text-align: center;
                    }
                    .social-section img {
                        margin: 0 15px;
                    }
                    hr {
                        border: 0;
                        height: 1px;
                        background-color: #dddddd;
                        margin: 40px 0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://st2.depositphotos.com/1768926/7866/v/450/depositphotos_78666192-stock-illustration-a-logo-sample-logo-for.jpg" alt="logo">
                        <h1>Booking Request</h1>
                    </div>
                    <div class="content">
                        <p><strong> Hello </strong>,</p>
                        <p>We have received a booking request from a guest. Here are the details:</p>
                        <h3>Guest Details:</h3>
                        <ul>
                            <li><strong>Guest Name:</strong> ${guestName}</li>
                            <li><strong>Check-in Date:</strong> ${checkinDate}</li>
                            <li><strong>Check-out Date:</strong> ${checkoutDate}</li>
                            <li><strong>Number of Adults:</strong> ${adults}</li>
                            <li><strong>Number of Children:</strong> ${children}</li>
                            <li><strong>Pets:</strong> ${pets}</li>
                            <li><strong>Billing Address:</strong> ${billingAddress}</li>
                            <li><strong>Phone Number:</strong> ${phoneNumber}</li>
                        </ul>
                        <h3>Site Details:</h3>
                        <ul>
                            <li><strong>Site Name:</strong> ${siteName}</li>
                            <li><strong>Site Address:</strong> ${siteAddress}</li>
                            <li><strong>Site Contact:</strong> ${siteContact}</li>
                            <li><strong>Amenities:</strong> ${siteAmenities}</li>
                            <li><strong>Price per Night:</strong> ${sitePrice}</li>
                            <li><strong>Lock Site Option:</strong> ${lockSite}</li>
                            <li><strong>Total Price:</strong> ${totalPrice}</li>
                        </ul>
                        ${rvDetails}
                        <p>Please assist the guest with their booking process.</p>
                        <p>Thank you!</p>
                    </div>
                    <hr>
                    <div class="social-section">
                        <p style="font-size: 16px; margin-bottom: 20px;">Visit Us On Social Media</p>
                        <a href="https://www.facebook.com">
                            <img src="https://cdn.jsdelivr.net/gh/dmhendricks/signature-social-icons/icons/round-flat-filled/50px/facebook.png" alt="Facebook" title="Facebook" width="30" height="30" />
                        </a>
                        <a href="https://www.instagram.com">
                            <img src="https://cdn.jsdelivr.net/gh/dmhendricks/signature-social-icons/icons/round-flat-filled/50px/instagram.png" alt="Instagram" title="Instagram" width="30" height="30" />
                        </a>
                        <a href="https://www.linkedin.com">
                            <img src="https://cdn.jsdelivr.net/gh/dmhendricks/signature-social-icons/icons/round-flat-filled/50px/linkedin.png" alt="LinkedIn" title="LinkedIn" width="30" height="30" />
                        </a>
                    </div>
                </div>
            </body>
            </html>
            `
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
