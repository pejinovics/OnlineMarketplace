# OnlineMarketplace
A full-stack web application for online advertising, built with a React frontend, Spring Boot backend, and PostgreSQL database. The platform allows users to create, view, edit, and filter ads across various categories, similar to kupujemprodajem.com.

## Getting Started

### Prerequisites

- **Node.js** (version 14.x or higher)
- **npm** (version 6.x or higher)
- **Java** (version 11 or higher)
- **Maven** (version 3.x or higher)
- **PostgreSQL** (version 12 or higher)

### Setting Up the Database

1. **Install PostgreSQL** if you haven't already.

2. **Create a database** named `onlineMarketplace`:
   ```sql
   CREATE DATABASE onlineMarketplace;

3. **Configure your PostgreSQL user** and set the connection details:
   - **Username:** `postgres`
   - **Password:** `postgres`

4. **Update the Spring Boot application properties** with the database connection details:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/onlineMarketplace
   spring.datasource.username=postgres
   spring.datasource.password=postgres

### Backend Setup (Spring Boot)

1. **Navigate to the backend directory**:

   ```bash
   cd Backend

2. **Build the project using Maven**:
   
   ```bash
   mvn clean install

3. **Run the Spring Boot application**:

   ```bash
   mvn spring-boot:run

The backend will start on [http://localhost:8080](http://localhost:8080).

### Frontend Setup (React)

1. **Navigate to the online-marketplace directory**:

   ```bash
   cd Frotend/online-marketplace

2. **Install the dependencies**:
   
   ```bash
   npm install

3. **Start the React application**:

   ```bash
   npm start

The frontend will be available at [http://localhost:3000](http://localhost:3000).

### Running the Application

1. **Start PostgreSQL** and ensure the `onlineMarketplace` database is running.
2. **Start the backend** by following the steps under "Backend Setup."
3. **Start the frontend** by following the steps under "Frontend Setup."
