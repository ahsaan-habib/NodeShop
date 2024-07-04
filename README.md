# NodeShop

## Overview

NodeShop is a MERN (MongoDB, Express, React, Node.js) shopping cart application integrated with Coinbase cryptocurrency payment functionality. This project provides a full-stack solution for online shopping with secure user authentication and real-time updates. This Cryptocurrency payment integration task was a part of a Technical Test of a Software Company.

## Features

- User authentication with JWT
- Product management (add, edit, delete products)
- Shopping cart functionality
- Order management
- Coinbase cryptocurrency payment integration
- Responsive design

## Requirements

- Node.js
- MongoDB

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nodeshop.git
cd nodeshop
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory with the following content:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
COINBASE_API_KEY=your_coinbase_api_key
PROJECT2_URL=your_project2_base_url
```

### 5. Seed the Database

```bash
npm run data:import
```

### 6. Run the Application

```bash
npm start
```

## Available Scripts

### Run the Development Server

```bash
npm run dev
```

Starts the backend server in development mode.

### Start the Application

```bash
npm start
```

Runs both the backend and frontend servers concurrently.

### Run Backend Only

```bash
npm run server
```

Starts the backend server with nodemon.

### Run Frontend Only

```bash
npm run client
```

Starts the React development server.

### Import Seed Data

```bash
npm run data:import
```

Imports sample data into the database.

### Destroy Seed Data

```bash
npm run data:destroy
```

Destroys all data from the database.

### Heroku Postbuild

```bash
heroku-postbuild
```

Builds the frontend for deployment on Heroku.

## Coinbase Payment Integration

The application uses Coinbase for handling cryptocurrency payments. To set up the Coinbase payment gateway, follow these steps:

1. **Create a Coinbase Commerce Account:**

   - Sign up for a [Coinbase Commerce](https://commerce.coinbase.com) account.
   - Generate an API key from the settings page.

2. **Configure the API Key:**

   - Add the API key to your `.env` file as shown below:

   ```
   COINBASE_API_KEY=your_coinbase_api_key
   ```

3. **Payment Workflow:**
   - When a user places an order, the application creates a charge using the Coinbase API.
   - The user is redirected to the Coinbase checkout page to complete the payment.
   - Upon successful payment, Coinbase sends a webhook notification to the application.
   - The application updates the order status based on the webhook notification.

## Project Structure

```
nodeshop/
│
├── backend/
│   ├── config/         # Configuration files
│   ├── controllers/    # Controller functions
│   ├── models/         # Mongoose models
│   ├── routes/         # Express routes
│   ├── services/       # Services for third-party integrations (Coinbase)
│   ├── seeder.js       # Database seeder script
│   └── server.js       # Entry point for the backend server
│
├── frontend/
│   ├── public/         # Public assets
│   ├── src/            # React source files
│   ├── .env            # Environment variables for frontend
│   └── package.json    # Frontend dependencies and scripts
│
├── .env                # Environment variables for backend
├── package.json        # Backend dependencies and scripts
└── README.md           # Project documentation
```

## Author

Ahsan Habib

## License

This project is licensed under the MIT License.
