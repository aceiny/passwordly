
## About
#### Passwordly - A Full stack password managment app
Passwordly ispassword managment app where you can easily store all your passwords in one place 

## Api docs

```bash
none
```
## Cloning

```bash
$ git clone https://github.com/aceiny/Itihad-Ged
```

## Installation

```bash
Server : $ npm install && npm i -g @nestjs/cli
Client (Admin , Client) : $ npm install
```
## Environment Variables
#### Server :
```
JWT_SECRET=#
COOKIE_SECRET=#
COOKIE_NAME=passoken //dont change
POSTGRES_HOST=#
POSTGRES_DB=#
POSTGRES_USERNAME=#
POSTGRES_PASSWORD=# 
REDIS_HOST=#
REDIS_PORT=#
REDIS_USERNAME=#
REDIS_PASSWORD=#    
REDIS_SERVER_NAME=#

```
#### Client
```
None
```
## Running the app

#### Server : 
```bash
# development
$ npm run start:dev or nest start --watch

# production mode
$ npm run start:prod or nest start prod
```
#### Client : 
```bash
#development
$ npm run dev 

# production mode
npm run build
```
## Features
user can add new passwords to save them 


## SECURITY MEASURES
- **Strong authentication:** using Passport.js and guards to control access based on authentication
- **Encryption:** Encrypting and hashing passwords 
- **Vulnerability Prevention::** Leverage security features built into NestJS like Helmet, which helps configure secure HTTP headers to mitigate common attacks.
- **Input Validation:** Validate all user-provided data to prevent unexpected inputs or malicious code injection
- **Rate Limiting:**  Implement rate limiting to prevent brute-force attacks or denial-of-service attempts.
## Technologies Used
- TypeScript
- Node.js
- Nest.js
- postgresql
- typeorm 
- uuid
- JWT
- Passport js 
- bcrypt 
- swagger
- class-validator
- cookie-parser
## Contributors
- ahmed yassine zeraibi , yzeraibi2000@gmail.com
