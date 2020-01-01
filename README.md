# Shorty
Quick and dirty url shortener using typescript and redis.
The shortened urls are stored in a non-persistent redis cache with a defined TTL.

### How to run in docker

1.  Run the command `docker-compose up` in the root project directory

### How to run dev server

1. Install dependencies with `npm install` or `yarn install`.

2. Run the command `npm run build-dev` or `yarn build-dev`.

3. Open a new terminal and run the command `npm run start` or `yarn start`
