# CRUD API

A tool for creating, reading, updating and deleting person-related data. The tool is based on in-memory database.

<p align="center">
<img src="https://user-images.githubusercontent.com/77797681/143687048-9d38dd33-27d9-47e4-b3ba-0ee07b716f1e.jpg" alt="CRUD API"/>
</p>

## Get started

1. Download and install latest LTS version of [Node.js](https://nodejs.org/en/). CRUD API requires v16.13.0 and later. To check if Node.js is installed, open a command shell (Windows Command Prompt, Git Bash or any other) and type `node -v`. You should see the Node.js version.

2. Download and install [Postman](https://www.postman.com/downloads/) (platform for using the API). Launch Postman app. Create an account or sign in. Select Workspaces in the Postman header and choose My Workspace.

3. Clone the repository (you must already have [git](https://git-scm.com/downloads) installed) by typing in the command shell:

   ```sh
   git clone https://github.com/EkaterinaShep/simple-crud-api
   ```

4. Go into the repository:

   ```sh
   cd simple-crud-api
   ```

5. Switch branch:

   ```sh
   git checkout simple-crud-api
   ```

6. Install dependencies:

   ```sh
   npm install
   ```

7. Run a local server in production or development mode:

   - Production mode:

     ```sh
     npm run start:prod
     ```

   - Development mode:

     ```sh
     npm run start:dev
     ```

8. Enter URL that you will see in the command shell in the URL field of Postman app, add the API path `/person`, click send, get a response.

That's it!

## Usage

### Methods

The CRUD API supports 4 methods:

- GET `/person` or `/person/${personId}` returns all persons or a person with corresponding `personId`
- POST `/person` is used to create a record about a new person and store it in the database
- PUT `/person/${personId}` is used to update a record about an existing person
- DELETE `/person/${personId}` is used to delete a record about an existing person from the database

### Format of personal data and required properties

Persons are stored as objects that have following properties:

- `id` — a unique identifier (string, uuid) generated on a server side
- `name` — person's name (string, **required**)
- `age` — person's age (number, **required**)
- `hobbies` — person's hobbies (array of strings or empty array, **required**)

### How to add and update personal data

To add or update a record you should:

1. Select the Body tab in Postman.
2. Switch to a raw mode.
3. Choose JSON format.
4. Enter personal data in JSON format.
5. Select needed method.
6. Send your record.
