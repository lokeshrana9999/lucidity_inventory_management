# Project Requirements

## Project Overview
A web-based inventory management application with dual user roles (admin/user) for managing product inventory, featuring real-time updates and role-based access control.

## Core Features

### User Roles

#### Admin
- Full access to all features
- Can edit, delete, and disable products
- Can view all inventory statistics

#### User
- Read-only access
- Can view products and inventory statistics
- No access to modification actions

### Functionality Requirements

#### Dashboard Widgets
- Total number of products
- Total store value
- Out of stock items count
- Number of categories
- Real-time updates when inventory changes

#### Product Management
- Product listing in tabular format
- Fields: Name, Category, Price, Quantity, Value
- Action buttons for admin operations

#### Admin Operations
- Edit product details via popup modal
- Delete products
- Disable/enable products
- Automatic dashboard updates after operations

#### API Integration
- Endpoint: `https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory`
- Method: GET
- Local state management for updates

### User Interface Requirements

#### Navigation
- Role switch toggle (admin/user)
- Clear visual distinction between roles

#### Product Table
- Sortable columns
- Action icons for admin
- Disabled state styling
- Mobile-responsive design

#### Edit Modal
- Form fields for product details
- Save/Cancel actions
- Input validation

## Technical Requirements

### Frontend Stack
- React (JavaScript/TypeScript preferred)
- State Management Options:
  - Redux, MobX, or Recoil (bonus)
  - Local state management acceptable

### Styling
- Options:
  - SCSS/CSS
  - Material UI
  - Tailwind CSS
  - Bootstrap

### Development Guidelines

#### Code Quality
- Clean, maintainable code
- Proper error handling
- TypeScript type safety (if used)

#### Performance
- Efficient state updates
- Optimized re-renders
- Responsive design

## Deliverables

### Code Repository
- Public GitHub repository
- Complete source code
- README with setup instructions

### Deployment
- Live demo on Vercel, Netlify, or similar platform
- Working production build

### Documentation
- Implementation video summary
- Code documentation
- Setup guide

## Timeline
- Recommended development time: 2-3 hours

## Evaluation Criteria
- React/JavaScript proficiency
- Code quality and organization
- UI/UX implementation
- Feature completeness
- Bonus: State management implementation 