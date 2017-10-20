# incrementor-eureka
Identifier incrementor created by Node.js, which provides WEB APIs.
The consumer client of the APIs was build by using React.js.

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

### Provided WEB APIs
* http://localhost:1337/api/user/register
