# Lucidity Inventory Management

## Overview

Lucidity Inventory Management is a web-based application designed to manage product inventory with dual user roles (admin/user). It features real-time updates and role-based access control.

## Features

- **Admin Role**: Full access to all features, including editing, deleting, and disabling products.
- **User Role**: Read-only access to view products and inventory statistics.
- **Dashboard Widgets**: Display total products, store value, out-of-stock items, number of categories, and total inventory.
- **Product Management**: List products in a table with sortable columns and action icons for admin operations.
- **API Integration**: Fetch products from a simulated API endpoint.
- **Responsive Design**: Mobile-friendly interface with clear role distinction.

## Technical Stack

- **Frontend**: React with TypeScript
- **State Management**: MobX
- **UI Library**: Ant Design
- **Styling**: CSS
- **Deployment**: Vercel/Netlify

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/lokeshrana9999/lucidity_inventory_management.git
   cd lucidity_inventory_management
   ```

2. **Install Dependencies**:
   ```bash
   yarn install
   ```

3. **Run the Application**:
   ```bash
   yarn start
   ```

4. **Build for Production**:
   ```bash
   yarn build
   ```

## Deployment

The application can be deployed on platforms like Vercel or Netlify. Ensure the build command is set to `yarn build` and the output directory is `build`.

## Documentation

- **Implementation Video**: A walkthrough video is available in the `docs` directory.
- **Code Documentation**: Inline comments and TypeScript types are used throughout the codebase.
- **Setup Guide**: This README serves as the setup guide.

## Evaluation Criteria

- Proficiency in React and JavaScript
- Code quality and organization
- UI/UX implementation
- Feature completeness
- Bonus: State management implementation
