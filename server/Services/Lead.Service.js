import info from '../info.js';
import nodemailer from  'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const transporter=nodemailer.createTransport({
      host:process.env.EMAIL_HOST,
      port:process.env.EMAIL_PORT,
      auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
      }
})
export const sendLeadEmail=async(lead)=>{
    const mailOptions = {//creating the mail options object
        from: 'singhnischal953@gmail.com',
        to: process.env.ADMIN_EMAIL,
        subject: 'New Lead Received',
        html: `<p><strong>${lead.name}</strong> submitted a new lead:</p>
               <ul>
                 <li>Email: ${lead.email}</li>
                 <li>Company: ${lead.company}</li>
                 <li>License: ${lead.licensetype}</li>
                 <li>Message: ${lead.message}</li>
               </ul>`
      }
      try{
      await transporter.sendMail(mailOptions);//sending the object to the transporter
      console.log("Email sent successfully");
      }
      catch(error){
        console.log("Error sending email",error);
      }
}
export const sendQuoteEmail=async(email,quote,licensetype,quantity)=>{
  const mailOptions={
    from:'singhnischal953@gmail.com',
    to:process.env.ADMIN_EMAIL,
    subject:'New Quote Request',
    html:`<p><strong>${email}</strong> requested a quote</p>
    <ul>
    <li>Email: ${email}</li>
    <li>Quote: ${quote}</li>
    <li>License Type: ${licensetype}</li>
    <li>Quantity: ${quantity}</li>
  </ul>`
  }
  try{
    await transporter.sendMail(mailOptions);//sending the object to the transporter
    console.log("Email sent successfully");
    }
    catch(error){
      console.log("Error sending email",error);
    }
}
