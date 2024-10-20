# Event Booking Platform

## Overview

This is the backend for an Event Booking Platform designed to allow users to book various services such as marriage venues, hotels, caterers, cameramen, DJs, and more. The platform features user and admin interfaces, enabling easy management and booking of services.

## Technologies Used

Node.js with Express.js
MongoDB 
JWT for authentication
Mongoose (for MongoDB)
bcryptjs (for password hashing)


## Prerequisites

Make sure you have the following installed on your system:

- Node.js (v14 or later)
- npm
- MongoDB


## Getting Started

### Setup

1. Clone the repository :

   ```bash
   git clone https://github.com/jitheshm/event-booking-platform.git

2. Navigate to the folder :

   ```bash
   cd event-booking-platform

3. Install dependencies:

   ```bash
   npm install

4. Create .env file:

   ```bash
   MONGODB_URL=your_mongodb_url
   NODEMAILER_EMAIL=your_nodemailer_email
   NODEMAILER_PASSWORD=your_nodemailer_password
   JWT_SECRET=your_jwt_secret

5. Start Servier:
   
   ```bash
   npm run dev

The server will run at port 3001.
You can change the port by adding PORT in .env file

The server should be running on http://localhost:3001.

## API Documentation

API Documentation available on [Documentation](https://documenter.getpostman.com/view/24947971/2sAXxWbVfn) 

