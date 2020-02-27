# :scroll: not-a-trello-clone-client
Web application for tracking tasks based on their deadline date. Visually displayed using a timeline where top represents current day. Tasks which have deadline date further away from today's date will be also visually further away from top on timeline. As the days pass, timeline will shift upwards clearly indicating which task needs to be completed first.

## :tv: Demo
![demo](https://github.com/Aleksandar-M/not-a-trello-clone-client/blob/master/Demo.gif)

## :wrench: Setup
These instructions will get you a copy of the application up and running on your local machine.
Because this application is made of two npm projects, there are two places to run `npm` commands:
1. **Node API server** in `not-a-trello-clone-server` directory
2. **React UI** in `not-a-trello-clone-client` directory

#### - Run the Node API server
In a terminal:
```
git clone https://github.com/Aleksandar-M/not-a-trello-clone-server.git
cd not-a-trello-clone-server

# change values after copying
cp .env.example .env

# Install all dependencies
npm install

# Run the server
npm start
```

#### - Run the React UI
In a separate terminal from the API server, start the UI:
```
# In a different directory(from server one) 
git clone https://github.com/Aleksandar-M/not-a-trello-clone-client.git
cd not-a-trello-clone-client

# Install all dependencies
npm install

# Run the server
npm start
```

## :package: Technologies used

- React
- Redux
- Node
- Express
- MongoDB
- Mongoose
