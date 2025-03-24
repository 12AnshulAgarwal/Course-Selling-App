# Online Course Management System

## Overview

The *Online Course Management System* is a backend-powered application that enables administrators to create and manage courses, while users can browse and purchase them. This system provides authentication, course management, and a purchasing mechanism, making it a robust solution for online learning platforms.

## Key Features

•⁠  ⁠*User Authentication*: Secure signup and signin with password hashing.
•⁠  ⁠*Admin Authentication*: Admins can create and manage courses.
•⁠  ⁠*Course Management*: CRUD operations for courses.
•⁠  ⁠*Purchase System*: Users can purchase courses and view their enrolled courses.
•⁠  ⁠*Role-Based Access*: Admins have different permissions compared to users.

## Technologies Used

•⁠  ⁠*Backend*: Node.js, Express.js
•⁠  ⁠*Database*: MongoDB, Mongoose
•⁠  ⁠*Authentication*: JSON Web Tokens (JWT), bcrypt
•⁠  ⁠*Validation*: Zod
•⁠  ⁠*Environment Variables*: dotenv

## Development Highlights

•⁠  ⁠*Authentication & Security*: Implemented secure authentication using JWT and bcrypt for password hashing.
•⁠  ⁠*Database Management*: Used Mongoose to efficiently handle database operations.
•⁠  ⁠*Middleware & Routing*: Utilized Express.js middleware for access control and request validation.
•⁠  ⁠*Error Handling*: Implemented structured error handling for a seamless user experience.

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/en/download/) and MongoDB installed on your machine.

### Installation

1.⁠ ⁠Clone the repository
 
2.⁠ ⁠Install dependencies:
```sh
   npm install
```
    ⁠
3.⁠ ⁠Create a ⁠ .env ⁠ file and add the required environment variables:
```sh
   ADMIN_JWT_PASSWORD=your_admin_secret
   USER_JWT_PASSWORD=your_user_secret
   MONGO_URI=your_mongodb_uri
```
4.⁠ ⁠Start the server:
```sh
   npm start
```
    ⁠
5.⁠ ⁠The server will run on ⁠ http://localhost:3000 ⁠ (or as configured).

---
