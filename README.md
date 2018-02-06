# Esploristo - Database Manager

## Ressources
- https://postgresql.org/docs/9.6
- https://wiki.postgresql.org/wiki/First_steps
- https://node-postgres.com/

## Install PostgreSQL
```
sudo aptitude install postgresql
sudo su - postgres
psql
```
create database ${database};
create user ${user} password '${password}';
alter user ${user} superuser;
grant all on database ${database} to ${user};
\q
```
```
exit
```

## Add dedicated user
```
sudo useradd ${user}
sudo passwd ${user}
```

## Setup configuration
```
cp config.js.example config.js
gedit config.js
```

## Reset database
```
gulp reset
```

## Upgrade database


## Use psql cli
```
su ${user}
psql
```
```
\l\d;
\d+ genre; \d+ movie; \d+ movie_genre;
select * from genre;
select * from movie limit 10;
select * from movie_genre limit 10;
select count(*) from genre;
select count(*) from movie;
select count(*) from movie_genre;

```

