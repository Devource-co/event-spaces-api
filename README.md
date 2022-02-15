# FindySpace - Making event spaces bookings easy and convinient.

## Vision
Revolutionize event spaces booking experience

---

## GET STARTED 🛫

#### Set up

- Navigate to the directory where you want to copy this repo,clone it by running `git clone <link of the repo>`

- Install `postgresql` into your computer

- Create two databases:
    -  for development
    -  for testing

- add connection string Urls to the `.env` file :
    - `DEV_DATABASE_URL=postgres://<username>:<password>@127.0.0.1:5432/<database for dev>` for development
    - `TEST_DATABASE_URL=postgres://<username>:<password>@127.0.0.1:5432/<database for test>` for testing

    - Make a copy of the .env.example and rename it .env, add the corresponding project variables, same as docker.env.example to docker.env

- Run migrations using `<migration script>`

- Run `<seed script>` for commit the seeds to the database

- To undo:
       - all seeders run `<undo seed script>`
       - all migrations run `<undo migration script>`

#### Run the app 🌋

- Run `npm run watch` to start the server
- Use `https://localhost:<port>` to run welcome

       
## Deployment 🚀🚀

This app will be deployed on heroku, To access this app go to these link:
    - [Production URL](https://https://kencinema.herokuapp.com/.herokuapp.com/)
    - [Staging](https://https://kencinema.herokuapp.com/.herokuapp.com/)

## API 🚦

It's is using navigate to route `https://localhost:<port>`

## Docker 🐳⚓️

#### Setting Up Docker

1. Install Docker on your pc using instruction [here](https://docs.docker.com/install/). Make sure it's running well

2. Navigate to the directory where you want to copy this repo,clone it by running `git clone <link of the repo>`

3. Follow the `.env.example` and `.docker.env.example` file to setup your environment and populate with corresponding values

4. In your root directory run `docker build -t <your username>/node-web-app .` to build your docker image

5. Run `docker images` to assure that image was successfully created

6. Run `docker run -p <given port>:4000 -d <your username>/<image name>` to run your image

#### Run app on Docker

1. Run `docker-compose build` to create and start containers

2. Run `docker ps` to get container ID

3. Run `docker exec -it <container id> sh` to enter container

4. Run `<undo migration script>` followed by `<undo migration script>`

5. Run `npm run start:dev` and test endpoint using postman using route `http://localhost:4000/`


