
## Description

Guide to run the application. This app was built with postgres, nestjs, typescript, prisma and react

## Initialize docker with the application

```bash
$ inside the folder "hubla_app" open the terminal and enter the command: [chmod +x .docker/entrypoint.sh]

$ inside the same folder "hubla_app" enter the command: [docker-compose up]

$ wait for the application to create the database, install the packages and initialize

$ when application is ready the following line will appear at the end: Nest application successfully started

$ the application will be running on http://localhost:8000

$ the API documentation will be running on http://localhost:3000

$ to stop the application inside the folder "hubla_app" type [docker-compose stop]

$ to run the application again type [docker-compose start]
```

## Application initial state

```bash
# Users
$ the application will start with the users from the sales list already registered in the database

$ if the seed of users does not work. Before inserting the sales list, register all usernames in the list in create user

$ for the app to carry out the transactions, the users who received the balance must be registered

$ registered users started with 0 balance

$ the application has a route to create users

$ registered users started with 0 balance

$ users can be deleted at http://localhost:3000, through API with swagger

$ users can be deleted at prisma studio, to access prisma studio read the section Database access


# Products
$ the application will start with the products from the sales list already registered in the database

$ if the seed of products does not work, before inserting the sales list, register all products on the list, in create product with the value and product producer

$ for the app to carry out transactions, the products sold must be registered

$ the application has a route to create products

$ products can be deleted at http://localhost:3000, through API with swagger

$ products can be deleted at prisma studio, to access prisma studio read the section Database access


# Transactions
$ the application will start with the list of transactions empty

$ the application has a route to insert a list of transactions to create the transactions and update the user s balance

$ only files txt will be accept in the form

$ the application will start with the list of transactions empty

$ on the page of the transactions list has a button to delete the transaction

$ on the page of the transactions list has a button to view the transaction details

$ # OBS: if the transactios list or users balance does not update when loading the updates file, just reload the page to load the change 
```


## Test

```bash
# unit tests front end
$ inside the hubla_app folder open the terminal and enter the command: [docker-compose exec app sh] to access the docker

$ enter the command: [cd client]

$ inside the client folder enter the command: [npm run test]

# unit tests back end
$ inside the hubla_app folder open the terminal and enter the command: [docker-compose exec app sh] to access the docker

$ enter the command: [cd server]

$ inside the server folder enter the command: [npm run test]

```


## Database access

```bash
$ the application uses the postgres database with orm prisma

$ to access the client database inside the hubla_app folder open the terminal and enter a command:

$ [docker-compose exec app sh] then enter a command [cd server] and then [npx prisma studio] await for appear "Prisma Studio is up on http://localhost:5555"

$ to access the database go to http://localhost:5555

$ maybe on linux the command [docker-compose exec app sh] does not work so try [docker-compose exec app bash]

```

## Support

if the application does not run, I can provide a url of the application running on heroku or amazon aws

## Stay in touch

- Author - [Ruhan Correa Soares]()

