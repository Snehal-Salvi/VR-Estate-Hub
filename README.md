# VR-Estate-Hub

VR-Estate-Hub is a virtual real estate platform that allows users to browse properties, schedule tours, and experience immersive virtual tours of properties. The platform also features role-based access control for customers, property admins, and super admins to manage properties and users.

## Features

- **Customer Functionality:**

  - Browse available properties.
  - Schedule property tours.
  - Experience virtual tours of properties through a VR simulation.

- **Property Admin Functionality:**

  - Manage properties (add, edit, and delete).
  - View scheduled property tours.

- **Super Admin Functionality:**

  - Manage all properties across the platform.
  - Manage Property Admin and Super Admin accounts.
  - Assign and update roles for users.

- **Role-Based Access Control:**

  - Three user roles: Customer, Property Admin, Super Admin.
  - Customers can browse properties and schedule tours.
  - Property Admins can manage assigned properties.
  - Super Admins have full control over users and properties.

- **JWT Authentication:**
  - JSON Web Tokens (JWT) are used for secure authentication and role-based access control.

---

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for building the API.
- **Mongoose**: MongoDB object modeling tool to handle data storage.
- **JWT**: Used for secure user authentication.
- **Bcrypt.js**: For password hashing and security.
- **Dotenv**: To manage environment variables.

### Frontend

- **React**: JavaScript library for building the frontend UI.
- **React-360**: Library for building VR experiences.
- **Bootstrap**: For styling and responsive design.
- **FontAwesome**: For icons in the user interface.

---

## How to Run the Application(Backend)

To run this project locally, follow these steps:

1. Clone the repository.
2. Navigate to the project directory:

```
cd backend
```

3. Install the necessary dependencies:

```
npm install
```

4. Set up environment variables.

5. Run the project.

```
npm start
```

## How to Run the Application(Frontend)

To run this project locally, follow these steps:

1. Clone the repository.
2. Navigate to the project directory:

```
cd frontend
```

3. Install the necessary dependencies:

```
npm install
```

4. Run the project.

```
npm start
```

## Authors

- [@Snehal](https://github.com/Snehal-Salvi)
