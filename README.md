# MarsDash - Food Delivery on Mars

Welcome to MarsDash, a conceptual interplanetary food delivery application built entirely with a Manifest backend and a React frontend.

## ✨ Features

- **User Authentication**: Customers can sign up, log in, and manage their accounts.
- **Role-Based Access**: The application provides different dashboards for Customers, Couriers, and Admins.
- **Restaurant Browsing**: Customers can browse a list of available restaurants on Mars.
- **Order History**: Customers can view their past orders and their current status.
- **Admin Management**: A complete, auto-generated admin panel for managing users, restaurants, menu items, and orders.

## 🛠️ Tech Stack

- **Backend**: Manifest (YAML-based backend configuration)
- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **SDK**: `@mnfst/sdk` for all backend communication

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Setup & Running

1.  **Clone the repository.**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the application:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 👨‍💻 Admin Panel

A powerful, auto-generated admin panel is available to manage all aspects of the application.

- **URL**: Available at your deployed backend URL + `/admin`.
- **Default Credentials**:
  - **Email**: `admin@manifest.build`
  - **Password**: `admin`

From the admin panel, you can:
- Create, Read, Update, and Delete Restaurants.
- Add Menu Items to restaurants, including prices and photos.
- Manage all user accounts and roles.
- View and manage all orders placed in the system.
