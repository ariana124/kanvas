## Kanvas 

A professional networking and job search site for both Software Engineer students and entry level SWE

### Table of Contents

- [Story and Inspiration](#inspiration)
- [Screenshots](#screenshots)
- [Web Architecture](#web-architecture)
- [Libraries and Tools](#libraries-and-tools)
- [Setup and Build](#setup-and-build)
- [Code Snippets](#code-snippets)
- [Features](#features)
- [Landing Page and Deployed App](#landing-page-and-deployed-application)
- [Timeline of Build and Resources](#timeline-and-resources)
- [Blog Posts about Kanvas](#blog-posts)
- [Authors](#authors)

### Inspiration 

### Screenshots
#### Landing Page
<p align="center">
  <img src="https://i.ibb.co/x84Nrkh/screencapture-landing-kanvasdevs-2020-06-24-19-23-59.png" style="width:790px">
</p>

#### Homepage
<p align="center">
  <img src="https://i.ibb.co/LdmVpRm/screencapture-kanvasdevs-2020-06-24-18-51-37.png" style="width:790px">
</p>

### Web Architecture 
<p align="center">
  <img src="https://i.ibb.co/BN2GDL3/image.png" style="width:770px">
</p>

### Libraries and Tools
<p align="center">
  <img src="https://i.ibb.co/cDq7Dfz/image.png" style="width:600px">
</p>

### Setup and Build
#### Frontend Setup
To test this build in your local machine you could go to the root folder of the repository to download modules and run the command:  
```npm install```  
  
To run it run the frontend for `development`, run the command:  
```npm start```

#### Backend Setup
To download the modules needed for the app, change the directory to `nodeapi` and run the command:  
```npm install```
To run the backend (RESTful API) run the command:  
```npm run dev```
#### Frontend Setup

### Code Snippets
#### Frontend
##### App.js
<p align="center">
  <img src="https://i.ibb.co/CvQGNbk/image.png" style="width:600px">
</p>

This is the driver for the routes of the frontend.
##### Sass file structure
<p align="center">
  <img src="https://i.ibb.co/9ppFmVf/image.png" style="width:305px">
</p>

This is how the SASS file structure looks like and its being run by one file. It's the `app.scss`.

##### app.scss
<p align="center">
  <img src="https://i.ibb.co/G7vswv8/image.png" style="600px">
</p>

The main file for using `SASS`.

#### Backend
##### api/app.js
<p align="center">
  <img src="https://i.ibb.co/QkHsfjM/image.png" style="width:640px">
</p>

This file is the main driver for handling requests/responses on the backend.

##### api/routes/jobs.js
<p align="center">
  <img src="https://i.ibb.co/QdVXCPk/image.png" style="width:500px">
</p>

This is the file where it will communicate with the `controllers` directory according to the file that was imported.

##### api/controllers/jobs.js
<p align="center">
  <img src="https://i.ibb.co/W6mc3ym/image.png" style="width:500px">
</p>

This is the file where we communicate with the GitHub Jobs API and receive job information.


### Features
<p align="center">
  <img src="https://i.ibb.co/b6KjZ7T/Screen-Shot-2020-06-24-at-7-32-23-PM.png" style="width:700px">
</p>


### Landing Page and Deployed Application 

- [Landing Page](https://www.landing.kanvasdevs.com/) made through Wix

- [Kanvas](https://www.kanvasdevs.com/) made by Ariana, Kevin, and Erika 

### Timeline and Resources 
<p align="center">
  <img src="https://i.ibb.co/jLNYNq3/Screen-Shot-2020-06-24-at-5-44-11-PM.png" style="width:800px">
</p>

### Blog Posts 

- To read more about Frontend development, read [Ariana's post](link)

- To read more about Backend development, read [Kevin's post](link)

- To read more about Project Management and Deployment, read [Erika's post](link)

### Authors

- UI/UX and Frontend Developer: [Ariana](https://github.com/ariana124)

- Fullstack Developer: [Kevin](https://github.com/kevapostol)

- Project Manager and Fullstack Developer: [Erika](https://github.com/ecaoili24)

