# README

### To run locally:

- Clone repo:
```
$ git clone https://github.com/flynfish/weather_demo.git
$ cd weather_demo
```
- [Install Docker](https://www.docker.com/community-edition#download) if you don't have it installed
- From weather_demo folder run:
```
$ docker-compose up --build
```
- Open new terminal window and from weather_demo folder run:
```
$ docker-compose exec web rails db:reset
$ docker-compose exec web rails db:migrate
$ docker-compose exec bundle && yarn
```
- visit http://localhost:3000
