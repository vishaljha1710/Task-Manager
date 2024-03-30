# Task Manager Website 

![image](https://github.com/vishaljha1710/Task-Manager/assets/77543816/6d2478cd-2611-4883-afdc-f11283ea7aaf)


## Introduction

This is the Readme file for the Task Manager website, a web application built using Node.js, Express.js, and MongoDB. The website allows users to log in and manage their tasks in a user dashboard with tabs for "Tasks," "In-Progress," and "Completed." It uses MongoDB Atlas to store user information and task statuses remotely.

## Features

- User Registration: Users can create an account by providing their email and password.
- User Authentication: Registered users can log in to access their dashboard and tasks.
- User Dashboard: The dashboard displays tasks in three tabs: "Tasks," "In-Progress," and "Completed."
- Add Tasks: Users can add new tasks to the "Tasks" tab.
- Move Tasks: Users can move tasks between the "In-Progress" and "Completed" tabs as they work on them.
- Delete Tasks: Users can remove tasks from any of the tabs.
- Remote Storage: User data and task status are stored remotely on MongoDB Atlas.

## Technologies Used

- Node.js: A JavaScript runtime environment for server-side development.
- Express.js: A web application framework for Node.js.
- MongoDB: A NoSQL database for storing user data and task information.
- MongoDB Atlas: A cloud-based MongoDB database service for remote storage.
- HTML and CSS: Used for the website's frontend.
- JavaScript: Used for client-side scripting and interaction.

## Installation

To set up and run the Task Manager website on your local machine, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-repo/task-manager-website.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-manager-website
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Configure the MongoDB connection:

   - Create a MongoDB Atlas account if you don't have one.
   - Create a cluster and configure your database.
   - Create a `.env` file in the project root directory and add your custom jwt token SECRET_KEY:

     ```env
     MONGODB_URI=your_mongodb_atlas_connection_string
     ```

5. Start the application:

   ```bash
   npm run start
   ```

The website should be accessible at `http://localhost:3000`.

## Usage

1. Register a new user account or log in with an existing one.

2. Once logged in, you will be directed to your dashboard, where you can manage your tasks.

3. To add a new task, use the "Add Task" button on the "Tasks" tab.

4. You can move tasks between the "In-Progress" and "Completed" tabs as you work on them.

5. To delete a task, click the delete icon next to the task in any tab.

6. Log out of your account when you're done.

## Dependencies

- Express.js
- Express-session
- Mongoose
- Passport.js
- Connect-flash
- EJS (Embedded JavaScript) for templates
- Bcrypt.js for password hashing
- Express-validator for form validation
- Dotenv for environment variable management

## Folder Structure

The project folder structure is organized as follows:
- `models`: MongoDB database models.
- `views`: HBS templates for rendering the website.
- `public`: Static files (CSS, JavaScript, images).
- `db`: Mongodb connection to database.
- `middlewares`: Custom middleware functions for authorization.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

This project was developed as a part of [Your Name]'s web development portfolio. Special thanks to the Node.js, Express.js, and MongoDB communities for their valuable resources and support.

Please feel free to contribute, report issues, or provide feedback to help improve this project. Enjoy using the Task Manager website!
