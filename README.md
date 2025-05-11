# play-vault

BRAIN BOOSTING GAME WEB APP

This is a full-stack interactive game web application designed to enhance cognitive, motor, and memory skills in Gen-Z children. The app revives classic old-school games with a modern digital twist and allows players to engage in fun, interactive games while tracking their progress and scores.

PROJECT SETUP INSTRUCTIONS

1. Export Code Files from Zip

    Clone the github repository: https://github.com/Aderonkehh/play-vault.git

    OR

    Extract the zip file PlayVaultWebApp_Project.zip which contains the following folder structure:

    brain-boosting-game-app/
    ├── backend/
    │   ├── db.js
    │   ├── server.js
    ├── frontend/
    │   ├── index.html
    │   ├── memory.html
    │   ├── rps.html
    │   ├── login.html
    │   ├── register.html
    │   ├── forgot-password.html
    │   ├── reset-password.html
    │   ├── dashboard.html
    │   ├── style/
    │   │   ├── memory.css
    │   │   ├── rps.css
    │   │   ├── dashboard.css
    │   ├── scripts/
    │   │   ├── memory.js
    │   │   ├── rps.js
    │   │   ├── auth.js
    ├── database/
    │   ├── schema.sql
    ├── docs/
    │   ├── API Documentation
    │   ├── Project Report Documentation
    ├── package.json
    ├── README.md

2. Install Dependencies

    Navigate to the backend/ folder:
    cd backend
    npm install

    Required Node.js packages:
        express
        mysql2
        cors
        body-parser

    You can also manually install:
        npm install express mysql2 cors body-parser

3. Set Up the Database

    Make sure MySQL is running on your machine.
    Run the SQL script in database/schema.sql to create the required tables.

    Update the credentials in db.js to match your MySQL setup:

    const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_user',
    password: 'your_password',
    database: 'brain_game'
    });

4. Start the Backend Server

    From the backend/ folder:

    node server.js

    Server will be accessible at: http://localhost:3000


HOW TO ACCESS THE FRONTEND

Once the backend server is running, open your browser and navigate to:

    http://localhost:3000/index.html

    Additional pages: these pages are accessible from index but can also be opened manually

    Login: /gameLaunch.html

    Register: /index.html.html

    Dashboard: /gameInterface.html

    Memory Game: /memory_Card_Game.html

    Rock Paper Scissors: /RockPaperScissors.html


API ROUTES & SAMPLE REQUESTS

All routes are relative to http://localhost:3000

1. Register User

    POST /register
    Body:
    {
    "username": "kid123",
    "password": "abc123",
    "confirmpassword": "abc123"
    }

2. Login User

    POST /login
    Body:
    {
    "username": "kid123",
    "password": "abc123"
    }

3. Check Username for Reset

    POST /check-username
    Body:
    {
    "username": "kid123"
    }

4. Reset Password

    POST /reset-password
    Body:
    {
    "username": "kid123",
    "newPassword": "new123"
    }

5. Delete Account

    DELETE /delete-account
    Body:
    {
    "username": "kid123"
    }


TECH STACK USED

Frontend

    HTML, CSS, JavaScript
    Tailwind CSS (some pages)
    Framer Motion & CSS Animations
    Custom Fonts

Backend

    Node.js
    Express.js
    Body-Parser 
    CORS
    MySQL

MySQL Database

    User table: stores username and password

APIs
    RESTful API (Custom-built with Express)


FUNCTIONALITY & FEATURES

    ✅ Responsive Landing Page

    ✅ User Registration and Login

    ✅ Password Reset Functionality

    ✅ Memory Card Game with scoring

    ✅ Rock Paper Scissors with animation and effects
    
    ✅ Simon Says with animation and effects

    ✅ Player Dashboard to view username and logout/delete

    ✅ Delete Account via profile dropdown

    ✅ Glassmorphism UI, CSS transitions, and retro pixel fonts

    ✅ Session management with sessionStorage

SCREENSHOTS

    Open "docs/screenshots" to view screenshots
    - /landing-page
    - /login
    - /dashboard
    - /rockPaperScissors
    - /memoryCardGame
    - /simonSays

ASSUMPTIONS & KNOWN LIMITATIONS

    Account data is stored securely in MySQL with plaintext passwords (no hashing for demo purposes).

    Game logic and animations are purely client-side.

    Auth is session-based using sessionStorage not cookies or JWT.

    No admin or leaderboard for now.

KNOWN LIMITATIONS

❗ Limitation: Only database and session based authentication.

❗ Limitation: No user account game history implemented yet

❗ Limitation: DB is on local storage, to run app, tester must create local DB using schema.sql


AUTHORS

    Sruthi Puthiyandy
    Aderonke Babatunde

Supervised by: Prof. Pragati Dharmale

