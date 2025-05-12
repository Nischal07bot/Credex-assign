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
        from: 'no-reply@softsell.example.com',
        to: process.env.ADMIN_EMAIL,
        subject: 'New Lead Received',
        html: `<p><strong>${lead.name}</strong> submitted a new lead:</p>
               <ul>
                 <li>Email: ${lead.email}</li>
                 <li>Company: ${lead.company}</li>
                 <li>License: ${lead.licenseType}</li>
                 <li>Message: ${lead.message}</li>
               </ul>`
      };
      await transporter.sendMail(mailOptions);//sending the object to the transporter
}
export const sendQuoteEmail=async(data)=>{
  const mailOptions={
    from:'no-reply@softsell.example.com',
    to:process.env.ADMIN_EMAIL,
    subject:'New Quote Request',
    html:`<p><strong>${data.email}</strong> requested a quote</p>
    <ul>
    <li>Email: ${data.email}</li>
    <li>Quote: ${data.quote}</li>
  </ul>`
  }
  await transporter.sendMail(mailOptions);
}
