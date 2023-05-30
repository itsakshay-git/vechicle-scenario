# React.js Scenario and Vehicle Simulation Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is a React.js application that allows users to create, display, update, and delete scenarios and vehicles. Each scenario can have multiple vehicles, and the vehicles can move based on the user's input.

## Features
1. Create, display, update, and delete scenarios and vehicles.
2. Start simulation to move vehicles based on the specified direction and speed.
3. Hide vehicles if they go outside the container.
4. Proper validation for adding vehicles to prevent positions greater than the graph container size.

## Technologies Used
1. React.js: Front-end JavaScript library for building user interfaces.
2. json-server: For storing data in a JSON file and serving it via a RESTful API.

## Prerequisites
Before running this application, make sure you have the following prerequisites installed:

1. Node.js: https://nodejs.org
2. json-server: You can install it globally by running npm install -g json-server.

## Usage
1. Start the JSON server:
json-server --watch db.json --port 3001
2. Start the React application:
npm start


## screenshot

![Screenshot (196)](https://github.com/itsakshay-git/vechicle-scenario/assets/110621476/ac18bb29-6b21-4e9a-a428-f0592fa2c57d)
![Screenshot (197)](https://github.com/itsakshay-git/vechicle-scenario/assets/110621476/1a938a07-4690-4904-916a-754ce0b3d2f5)
![Screenshot (199)](https://github.com/itsakshay-git/vechicle-scenario/assets/110621476/693d133e-b55e-491f-a378-3feda5a2213d)
![Screenshot (200)](https://github.com/itsakshay-git/vechicle-scenario/assets/110621476/2e4f1813-90f1-4406-b492-dfb495de5cc9)

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
