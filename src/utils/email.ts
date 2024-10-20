import nodemailer from 'nodemailer';
import { IUsers } from '../interfaces/IUsers';
import { ServiceWithContact } from '../interfaces/IServices';

const mailerConfig = {
    nodemailerEmail: process.env.NODEMAILER_EMAIL,
    nodemailerPassword: process.env.NODEMAILER_PASSWORD,
};

export const sendConfirmEmail = (user: Omit<IUsers, 'password'>, service: ServiceWithContact, dates: Date[]) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: mailerConfig.nodemailerEmail,
                pass: mailerConfig.nodemailerPassword,
            },
        });

        const formattedDates = dates.map((date) => {
            return `<li>${date.toDateString()}</li>`;
        }).join('');

        const mailOptions = {
            from: mailerConfig.nodemailerEmail,
            to: user.email,
            subject: 'Event Booking Confirmation',
            html: `
              <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
                <h2 style="color: #4CAF50;">Booking Confirmation</h2>
                <p>Dear ${user.name},</p>
                <p>Thank you for booking with us! Your reservation for the event has been confirmed.</p>
                <p><strong>Event Details:</strong></p>
                <ul>
                  <li><strong>Event Name:</strong> ${service.title}</li>
                  <li><strong>Date(s):</strong> 
                    <ul>
                      ${formattedDates}
                    </ul>
                  </li>
                  <li><strong>Location:</strong> ${service.location}</li>
                </ul>
                <p>Please keep this email for your records. We look forward to seeing you at the event!</p>
                <p>If you have any questions, feel free to contact us.</p>
                <p>Best regards,</p>
                <p>Event Platform Team</p>
              </div>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (error) {
        console.log(error)
    }
};
