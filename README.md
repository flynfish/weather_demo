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
$ docker-compose build && docker-compose run website yarn && docker-compose run website rails db:migrate && docker-compose up
```
- visit http://localhost:3000
- If you get a timeout error the first time, just refresh

### Design Considerations

- I'd normally structure json updates in an API namespace to keep things separate from normal rails controllers
- I chose docker so you could get things running quickly
- Used React on the frontend
  - I would normally break components up more than I did
