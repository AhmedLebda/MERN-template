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

A template for MERN stack projects with basic email and password auth

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Clone Repo

### Prerequisites

node

### Installation

1- install all deps in frontend and backend
2- backend:
a- create a mongodb db and add the uri to the .env file
b- uncomment the db connection code in app.js

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Info

Information about this template

### Frontend

Dependencies:

-   react
-   react router
-   tailwindCss

Features:

-   pages: layout, error 404, home and about
-   react router configuration with home and about routes
-   eslint: prop types disabled

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

-   basic express server config (RESTful API)
-   index and user routes for login, sign-up and logout
-   utils: create and verify jwt
-   models: user model with first name, last name, email, password, confirm password, status fields
-   middlewares:
    -   validation for login and sign-up forms
    -   check user to verify jwt token in cookies
    -   require auth to verify jwt token to protect routes - controllers: user controllers for:
        -   post_sign-up
        -   post_login
        -   get_logout

###

-   Error handling custom middleware (/middlewares/error_handler/errorHandler.js)
-   Auth helper utility functions (/utils/helpers/auth_helpers.js)

###

-   Auth Middleware: require access middleware that adds the user id to request or throws if the token doesn't exist or invalid (/middlewares/auth/requireAccess.js)
-   User Model:
    -   Add username field
    -   remove the login and password hash and move them to it's own auth module
-   User Controllers:
    -   refactored login_post => user_login, signup_post => user_create
    -   removed the logout route
-   removed modules: /utils/auth.mjs, /middlewares/authMiddleware.mjs

###

-   changed all extensions from .mjs to .js
-   add "express-async-handler" instead of "express-async-errors"
-   fixed user login and sign-up error handlers
-   Add test rest requests for user login and sign-up

#### updates

-   Implemented API tests with Supertest for the users endpoint

<p align="right">(<a href="#readme-top">back to top</a>)</p>
