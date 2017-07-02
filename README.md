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
$ docker-compose exec website rails db:reset
$ docker-compose exec website rails db:migrate
```
- visit http://localhost:3000

### Design Considerations

- I'd normally structure json updates in an API namespace to keep things separate from normal rails controllers
- Chose docker so you could get things running quickly
- Used React on the frontend
  - I would normally break components up more than I did
