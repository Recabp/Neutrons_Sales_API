# Api de vendas generica

O usuário deve conseguir realizar, visualizar e cancelar seus pedidos
O usuário logado só deve ver pedidos realizados por ele.
O usuário logado só pode cancelar pedidos realizados por ele.


ormconfig usada no projeto 

[
  {

    "type": "postgres",
    "host":"localhost",
    "port": 5432,
    "username":"postgres",
    "password":"docker",
    "database":"neutron",
    "entities":["./src/modules/**/infra/typeorm/entities/*.ts"],
    "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
    "cli": {
      "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }

  },

  {
    "name":"mongo",
    "type": "mongodb",
    "host":"localhost",
    "port": 27017,
    "database":"neutronsmongo",
    "useUnifiedTopology": true,
    "entities":["./src/modules/**/infra/typeorm/schemas/*.ts"]

    }




]
     




