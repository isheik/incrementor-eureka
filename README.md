# incrementor-eureka
Identifier incrementor created by Node.js, which provides WEB APIs.
The consumer client of the APIs was built by using React.js.

## How to use
### Preconditions
1. git is installed
2. Node.js and npm are installed
3. MongoDB is installed and running on localhost:27017

### Install
```
git clone https://github.com/isheik/incrementor-eureka.git
cd incrementor-eureka
npm install
cd frontend
npm install
```

### How to run
From the home directory of incrementor-eureka...

* backend
```
cd backend
node server.js
```
*NOTE: Currently backend server can only listen to port 1337*


* frontend (API consumer)
```
cd frontend
npm start
```
*NOTE: Currently frontend server can only listen to port 3000*

## Provided WEB APIs
### User Login (Require POST param: mail, password)
* http://localhost:1337/api/user/login

### User Register (Require POST param: mail, password)
* http://localhost:1337/api/user/register

### Get current identifier (Secured. Require POST param: token)
* http://localhost:1337/api/data/currentidentifier

*token can be obtained through login*

### Get next identifier (Secured. Require POST param: token)
* http://localhost:1337/api/data/nextidentifier

*token can be obtained through login*

### Reset identifier (Secured. Require POST param: resetval, token)
* http://localhost:1337/api/data/resetidentifier

*token can be obtained through login*

## Assumptions
* User email address should be unique in this system, so registering the same email is not allowed.
* this system does not allow uppercase email address. It is automatically converted to lowercase.
* Invalid email address form is not allowed to register in this system.
* If necessary, logout feature is implemented in consumer side. (The frontend SPA has it.)

## Known Issues
* This service has not been able to follow JSON API specs very well.
