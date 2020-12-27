# Recuperação de senha

**RF** (requisitos funcionais)

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF** (requisitos não funcionais)

- Utilizar Mailtrap para testar envios em ambiente dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN** (Regras de negocio)

- O link enviado por email para resetar senha deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha o usuário deve informar a senha antiga;
- Para atualizar sua senha o usuário precisa confirmar a senha nova;

# Painel do prestador

**RF**

- O usuário deve poder listar seu stock atual;


**RNF**

- O stock do prestador deve ser armazenado em cache;





