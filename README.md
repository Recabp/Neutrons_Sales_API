# Api de vendas generica

O usuário deve conseguir realizar, visualizar e cancelar seus pedidos
O usuário logado só deve ver pedidos realizados por ele.
O usuário logado só pode cancelar pedidos realizados por ele.



# Rotas


# AuthenticateUser    /sessions
- deve autentificar o usuario recebendo: email e password

# CreateUser    /users

- deve criar um usuario recebendo: nome, email, type("client" | "provider") e password

# SendForgotPassword  /password/forgot

- deve mandar um email com um token para atualização de senha recebendo: email

# ResetPassword  /password/reset

- deve resetar a senha recebendo: senha, password, password_confirmation e token

# UpdateProfile /updateuser

- deve alterar o email, nome e senha do usuario recebendo: name e email obrigatoriamente e opcionalmente password

# ListProviders  /list

- deve listar todos os providers: recebendo um token valido

# AddStock   /addstock

- deve adicionar stock recebendo: product, quantity, type, price e um token valido

# ListStock   /liststock

- deve listar o stock recebendo: um token valido

# ListProducts   /listproducts/id/products

- deve listar os produtos de um determinado provider recebendo: um token valido

# Buy   /buy/id

- O usuario deve conseguir comprar recebendo: quantity, product, type, um token valido e o provider id na url

# CancelPurchase   /cancel/id

- O usuario deve conseguir cancelar a compra recebendo: o user id na url

# ShopHistory  /shophistory/id

- O usuario deve conseguir listar o historico de compras recebendo: um token valido e o user id na url

# CustumerOrder  /custumerorder/id

- deve listar os pedidos dos clientes recebendo: um token valido e o provider id na url


# Docker images

-Mongo

sudo docker run --name neutronsmongo -p 27017:27017 -d -t mongo

-Redis

sudo docker run --name redis -p 6379:6379 -d -t redis:alpine

-Postgres

docker run --name gostack -e POSTGRES_PASSWORD=password -d postgres -p 5432:5432











