<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
     <li>
      <a href="#info">Info</a>
      <ul>
        <li><a href="#frontend">frontend</a></li>
        <li><a href="#backend">backend</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

A template for MERN stack projects:

-   Front-end (vite React + JavaScript)

    -   basic routing with react-router-dom

-   Back-end ( NodeJs 'ExpressJS' + MongoDB 'Mongoose')

    -   The app comes with many built-in features, such as authentication using JWT, request validation, error handling, logging, API documentation, test suites:

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

-   Clone Repo

### Backend

-   cd backend
-   npm install
-   configure the files bellow:
    -   .env
-   npm run dev => to start the development server

### Front-end

-   cd frontend
-   npm install

### Prerequisites

node, npm

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Info

### Frontend

### Dependencies:

-   react
-   react router
-   tailwindCss

#### Features:

-   pages: layout, error 404, home and about
-   react router configuration with home and about routes

### Backend

#### Dependencies:

-   express
-   express-validator
-   ~~express-async-errors~~ => express-async-handler
-   mongoose
-   jsonwebtoken
-   bcrypt
-   cookie-parser
-   cors-env
-   cors
-   morgan

#### Dev Dependencies:

-   supertest

### Features:

-   Models: basic user model with validations
-   NoSQL database: MongoDB object data modeling using Mongoose
-   Authentication and authorization: using JWT (access token)
-   Validation: request data validation using express-validator
-   Logging: using morgan
-   Error handling: error handling mechanism with specific result messages and codes
-   CORS: Cross-Origin Resource-Sharing enabled using cors
-   Tests: test suits for user endpoint for sign-in and sign-up

<p align="right">(<a href="#readme-top">back to top</a>)</p>
