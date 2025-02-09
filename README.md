## Install dependencies
* npm install
* cd frontend npm install

## Create .env file in root dir and add keys
* NODE_ENV 
* PORT
* JWT_SECRET
* APP_BASE_URL

## NPM commands
* npm run dev - runs the backend and the frontend
* npm run start - runs the backend/server only
* npm run server - runs the backend/server only and watches everytime there's a change
* npm run client - runs the frontend client only
* npm run data:import - imports the data and store it into the database
* npm run data:destroy - destroys/deletes all of the data in the database

## User manual
https://docs.google.com/document/d/1bAf14sr0ot338VgFgXLP7QBTs7HTM1ENQjQZ3K6aoVE/

## Documentation
https://docs.google.com/document/d/1nbZ1wUzAOLT_jM-w34-5nrgBx4g36KJrd_XiFGMXfJM

## Libraries
* tailwindcss (https://tailwindcss.com/)
* heroicons (https://heroicons.com/)

## API Routes


## BACKEND
- Backend is developed using Express JS, Node JS and the Database is Non-SQL. It's MongoDB atlas. Web socket is also used to listen to changes in the backend and do something in the frontend. The main file of the backend is the "server.js". It's the heart of the backend, everything follows from there. The API routes are given above.

## FRONTEND
- Frontend is developed using plain React JS and tailwind CSS. The main file is in the "App.js" and everything follows from there. Most components are dynamic and the backend is already integrated. We use inline tailwind CSS for styling. This is component based, so everything that can be reusable is put into a component for cleaner and much efficient system.