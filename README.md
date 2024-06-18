# Alumni Dashboard for NU
A robust and comprehensive Alumni Dashboard that may be utilised in the day-to-day activities of the stakeholders of NU.
<br><br>
![image](https://github.com/spartny/alumni-dashboard/assets/105193713/af6b4505-e4b7-44f8-b21f-360a5e1c5ce6)
<br><br>
Here is an illustration of the Architecture  of our MERN web app. There are two types of users that  this application is built for, One is a regular user and another with admin privileges 

Both have to login into the application via a browser, that is the client device. The Login page is part of the react frontend along with other pages that the user may have access to.

The frontend communicates with the node express backend via API endpoints and sends requests that are fulfilled with responses by the backend server.

The server then queries the mongoDB database that is hosted on the Atlas cloud servers through the mongoose API. The fetched out data is then processed by the backend and then sent to the frontend to build the graphs and visualizations

## Login Page
![image](https://github.com/spartny/alumni-dashboard/assets/105193713/fb6afc6d-bb2b-4543-9ee5-da5a65cc0793)

## Alumni Page
![image](https://github.com/spartny/alumni-dashboard/assets/105193713/fa06293e-7223-4e28-9bb1-ab255e05f813)

## Companies Page
Heatmap to view the number of alumni in top companies, along with a searchable table to check which companies has how many alumni working there currently.
## Entrepreneurs Page
Various graphics to showcase the entrepreneurial prowess of alumni and the companies that they have set up.
## Add Data Page (Admin Only)
![image](https://github.com/spartny/alumni-dashboard/assets/105193713/af7a6d06-e37a-4aa4-b0cc-9eaaddc42e36)

## Create User Page (Admin Only)
![image](https://github.com/spartny/alumni-dashboard/assets/105193713/878c5532-8818-40b7-ad17-824f969be234)

## Features
Passwords are encrypted using the BCrypt hashing algorithm before storing it in the database. 

Implemented OAuth Sign-in for internal accounts such as st.niituniversity, similar to the NU ERP. 

Session management with JWT tokens

Role based access for users with admin privileges

The ability to create new users 

Upload Excel files to append data for visualizations

Incorporated area, bar, choropleth, heatmaps, pie charts based on the availability of alumni data.

Interactive Graphs

with the ability to expand them and apply filters too,

Hosted live on render.com

Database backups in Atlas Cloud
