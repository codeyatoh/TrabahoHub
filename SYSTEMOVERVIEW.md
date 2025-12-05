# System Overview - TrabahoHub

This document explains how the TrabahoHub frontend works. It is written simply to help new developers understand the flow and structure of the project.

## 🔍 How the App Works (The Big Picture)

TrabahoHub is a **Single Page Application (SPA)**. This means the website doesn't reload every time you click a link. Instead, it just swaps the content you see on the screen.

1.  **Landing Page:** When you open the app, you see the `LandingPage`. This is the public home page.
2.  **Login:** You click "Login" and go to the `Login` page. Here, you enter the sample credentials (found in README.md).
3.  **Role Detection:** When you log in, the app checks if you are a **Client**, **Freelancer**, or **Admin**.
4.  **Dashboard:** Based on your role, you are sent to your specific Dashboard (e.g., `/client/dashboard`). You will only see features relevant to your role.

## 🏗️ Detailed Folder Breakdown

### 1. `src/services/mockData.js` (The Database)

Since this is a prototype, we don't have a real backend database. Instead, all data is stored in this file.

- **What's inside?** Lists of Users, Jobs, Messages, and Notifications.
- **How to change data?** If you want to add a new user or change a job description, you simply edit this file directly.

### 2. `src/context/UserContext.jsx` (The Brain)

This file manages the "Authentication State".

- **What it does:** It keeps track of who is currently logged in.
- **How it helps:** It allows any page (like the Profile or Sidebar) to know the current user's name and photo without passing data manually through every file.

### 3. `src/roles/` ( The Specifics)

This is where the unique pages for each user type live.

- **`admin/`**: Contains `ManageUsers.jsx`, `Dashboard.jsx`, etc. Only admins see these.
- **`client/`**: Contains `PostJob.jsx`, `Projects.jsx`. Only clients see these.
- **`freelancer/`**: Contains `BrowseJobs.jsx`, `Dashboard.jsx`. Only freelancers see these.

### 4. `src/shared/` (The Reusable Parts)

These are components that represent the designs used everywhere to confirm consistency.

- **`Sidebar.jsx`**: The navigation menu on the left. It changes links based on who is logged in.
- **`Navbar.jsx`**: The top bar (mostly used on the landing page).
- **`RoundedCard.jsx`**: The white boxes with rounded corners you see holding content.
- **Buttons & Inputs**: Standard styles for form elements.

## 🔗 How Pages Connect

- **Routing (`App.jsx`):** This is the map of the application. It defines which file shows up for which URL (e.g., URL `/login` -> shows `Login.jsx`).
- **Links:** We use `<Link to="...">` instead of `<a href="...">`. This makes navigation instant.

## 📝 Notes for Developers

### Forms & Buttons

- **Buttons:** Most buttons currently just navigate to another page or open a modal (popup).
- **Forms:** Forms like "Post Job" or "Edit Profile" collect data but currently do not permanently save it to a real database (since we use mock data). Changes will disappear if you refresh the page or restart the server.

### User Images

- We use a helper to import images in `mockData.js`.
- If you add a new image, put it in `src/assets/images`, import it in `mockData.js`, and assign it to a user.

### Changing the Design

- We use **Tailwind CSS**. You can change colors, spacing, and fonts by adding class names (e.g., `text-red-500`, `p-4`, `flex`) directly in the HTML-like JSX code.

---

_Use this guide to understand where to find code and how the pieces fit together!_
