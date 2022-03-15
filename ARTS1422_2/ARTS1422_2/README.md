This project was created using [Microsoft Web Template Studio](https://github.com/Microsoft/WebTemplateStudio).

## Getting Started

The best way to launch the application is using the [Visual Studio Code Tasks](https://code.visualstudio.com/docs/editor/tasks). In the `vscode/tasks.json` file you can find all the tasks configured for this project.

To launch a task click on the menu `Terminal > Run Task` and select the task to launch (or press `Ctrl+Shift+P` and choose the `Tasks:Run Task` command).

To run the project:

1. Install dependencies using `Install dependencies` task.
2. Start development app using `Start App` task.

## File Structure
```
.
├── .vscode/ - Visual Studio Code configuration files
├── backend/ - Backend App
│ ├── arts_1422_2 - app folder
│ ├── scripts/ - scripts to publish
│ └── app.py - Start flask app
├── frontend/ - Frontend App
│ ├── public/ - public static files
│ ├── scripts/ - scripts to publish
│ ├── src/ - Vue app folder
│ │   ├── assets/ - Default images
│ │   ├── components/ - Common Vue components shared between different views
│ │   ├── router/ -  Vue routes
│ │   ├── views/ - The main pages displayed
│ │   ├── App.vue - Base Vue template
│ │   ├── constants.js - Contains constants for error messages and endpoints
│ └── └── main.js - Root Vue Component
└── README.md
```

### Frontend

The frontend is based on [Vue CLI](https://cli.vuejs.org/).

The most important scripts in the `package.json` are:
  - start: serves the frontend in development on http://localhost:3000/.
  - build: Builds the app for production to the `build` folder.
  - publish: Builds the app for production and moves the output to the `publish` folder.

To start the frontend application manually:
  1. Open a terminal and navigate to the `frontend` folder path.
  2. Use `yarn install` or `npm install` to install frontend dependencies.
  3. Use `yarn start` or `npm start` to start frontend app in development.

### Backend

The backend is based on [Flask](https://github.com/pallets/flask).

To start the backend application manually:
  1. Open a terminal and navigate to the `backend` folder path.
  2. Use `pip install -r requirements.txt` to install backend dependencies.
  3. Use `python3 server/server.py || python server/server.py || py -3 server/server.py` to start backend app in development. It is served on http://localhost:3001/

## Deployment

To deploy the application in an Azure App Service follow the deployment instructions:

- [Deployment using Web Template Studio Deploy command](https://github.com/microsoft/WebTemplateStudio/blob/dev/docs/generated-apps/deployment.md)

Consider adding authentication and securing backend API's by following [Azure App Service Security](https://docs.microsoft.com/en-us/azure/app-service/overview-security).

## Additional Documentation

- Vue - https://vuejs.org/v2/guide/
- Vue Router - https://router.vuejs.org/
- Flask - http://flask.pocoo.org/
- Bootstrap CSS - https://getbootstrap.com/
