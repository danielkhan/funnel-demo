# React Funnel Sample Application

This repository contains a sample application consisting of a React frontend and Flask backend.
The Flask backend simulates a call to an API and there are ways to emulate different response codes or delays.

## Setup

1. [Download and install Python >= 3](https://www.python.org/downloads/) if you haven't already.
2. [Download and install a recent Node.js version](https://nodejs.org/en/download) if you haven't already.
3. [Download and install Docker Desktop](https://docs.docker.com/desktop/install/mac-install/) if you haven't already. 
3. Clone the repository and open it in Visual Studio Code.
4. Install the Python Language Support extension in Visual Studio Code.
5. Go to "View -> Command Palette" ans search for "Python: Create Environment".
6. Select ".venv" and follow the instructions 
- select a Python interpreter from the list
- confirm to let all extensions to be installed.
7. Rename `.env-sample` to `.env`.
8. Create a Sentry project for React and for Flask and enter their DSNs into their respective properties in `.env`.
10. Open a separate terminal run
- `cd backend`
- `pip install -r ./requirements.txt`
11. Open a terminal in Visual Studio Code and run
- `cd frontend`
- `npm install`
- `npm start`
12. In another separate terminal, type `./start-third-party.sh`.

This should open the browser at http://127.0.0.1:3000.

## Emulating Problems

