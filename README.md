# TrabahoHub - Frontend Prototype

Welcome to **TrabahoHub**! This is a frontend prototype for a job matching platform designed for freelancers and clients in the Philippines. This project demonstrates the user interface and user experience for three different roles: Client, Freelancer, and Admin.

## 🛠️ Technology Stack

This project is built using modern web technologies:

- **HTML5 & CSS3:** For structure and styling.
- **JavaScript (React):** The main programming language and library used to build the interactive user interface.
- **Vite:** A tool that makes the project run very fast during development.
- **Tailwind CSS:** A utility-first CSS framework for styling components quickly and beautifully.
- **React Router:** For navigating between different pages (like Dashboard, Profile, Settings) without reloading the page.

## 📂 Folder Structure

Here is a simple guide to where everything is located:

- **`src/`**: The main folder where all the code lives.
  - **`assets/`**: Contains images (like user profiles) and other static files.
  - **`auth/`**: Contains the Login page and logic to detect user roles.
  - **`components/`**: (If applicable) specific components.
  - **`context/`**: Contains `UserContext.jsx`, which acts like a "brain" that remembers who is logged in.
  - **`pages/`**: Contains the main Landing Page.
  - **`roles/`**: This is where the specific pages for each user type are stored:
    - **`admin/`**: Pages for the Admin dashboard and user management.
    - **`client/`**: Pages for Clients to post jobs and view freelancers.
    - **`freelancer/`**: Pages for Freelancers to find jobs and view their profile.
  - **`services/`**: Contains `mockData.js`, which holds all the fake data (users, jobs, messages) used in this prototype.
  - **`shared/`**: Contains components used across the entire app, like the Sidebar, Navbar, and Buttons.

## 🚀 How to Install and Run

Follow these simple steps to get the project running on your computer:

### Prerequisites

Make sure you have **Node.js** installed on your computer.

### Installation Steps

1.  Open your terminal or command prompt.
2.  Navigate to the project folder (`d:\3rd Year Project\TrabahoHub`).
3.  Install the necessary dependencies by running:
    ```bash
    yarn install
    ```

### Running the Project

1.  Start the development server by running:
    ```bash
    yarn dev
    ```
2.  Look for the "Local" URL in the terminal (usually `http://localhost:5173`) and open it in your web browser.

## 🔑 Sample User Credentials (Demo)

You can use these accounts to test the different roles in the application.

### 1. Client Account

Use this account to post jobs and hire freelancers.

- **Name:** Aivy Gonzales
- **Email:** `aivy@trabahohub.com`
- **Password:** `client123`

### 2. Freelancer Account

Use this account to browse jobs and view your profile.

- **Name:** Angelito Halmain
- **Email:** `angelito@trabahohub.com`
- **Password:** `freelancer123`

### 3. Admin Account

Use this account to manage users and view platform statistics.

- **Name:** Jonathan Rolter Dagondon
- **Email:** `jonathan@trabahohub.com`
- **Password:** `admin123`

## 🖼️ Assets and Mockups

The user profile images used in this project are located in the `src/assets/images` folder. These include photos for Aivy, Angelito, Jonathan, and others.

---

_Created for the 3rd Year Project - TrabahoHub_
