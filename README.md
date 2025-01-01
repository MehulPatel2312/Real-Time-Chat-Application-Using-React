# Chat Application

A real-time chat application built with **React** on the frontend and **Node.js** with **Socket.IO** on the backend.

---

## Required Libraries

### Frontend

- `socket.io-client`

Install with:


npm install socket.io-client


### Backend

- `express`
- `socket.io`
- `cors`

Install with:


npm install express socket.io cors


---

## Folder Structure


project-folder
├── client
│   ├── public
│   ├── src
│   │   ├── App.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server
│   ├── server.js
│   └── package.json
└── README.md


---

## How to Run the Application

### Backend Server

1. Navigate to the `server` folder:
   
   cd server
   
2. Install dependencies:
   
   npm install
   
3. Start the server:
   
   node server.js
   
   _Note: Use `nodemon server.js` if `nodemon` is installed._

### Frontend

1. Navigate to the `client` folder:
   
   cd client
   
2. Install dependencies:
   
   npm install
   
3. Start the React app:
   
   npm start
   

---

## Configuration

### Backend Server Address

In the `App.js` file of the React application, update the `socket` connection URL:


const socket = io("http://<your-server-ip>:5000");


Replace `<your-server-ip>` with the IP address or domain name of your server.

---

Feel free to reach out for further assistance or clarification!
