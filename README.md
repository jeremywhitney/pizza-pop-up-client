# Pizza-Pop-Up Web Application

A full-stack web application for a pizza restaurant (Steady Habits Pizza) that allows customers to view the menu, create orders, and manage their profiles. Also includes employee-specific views for order, menu, product management.

**API:** [Pizza-Pop-Up API](https://github.com/jeremywhitney/pizza-pop-up-api)

## Features

### MVP
- View complete menu of offerings
- Create, modify, and submit orders
- Guest cart functionality
- User authentication
- User profiles with saved payment methods, order history

### Additional Features
- Employee dashboard with order and menu managers
- Add/edit menu items

## Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- TanStack Query
- Radix UI
- Tailwind CSS
- Zustand (cart state management)

### Backend
- Django REST Framework

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
1. Clone the repository
```bash
git clone [git@github.com:jeremywhitney/pizza-pop-up-client.git]
cd pizza-pop-up-client
```
2. Install dependencies
```bash
npm install
```
3. Start the development server
```bash
npm run dev
```

### Project Structure
src/
- components/      # Reusable components
- contexts/        # Modal management
- routes/          # Page components
- hooks/           # Custom hooks
- lib/             # Configuration files

### Available Scripts
```bash
npm run dev
``` 
- Start development server
```bash
npm run build
``` 
- Build for production
```bash
npm run preview
``` 
- Preview production build

### Future Enhancements
- Events page
- Contact Us page
- About Us page
- Feedback form
- Customer Favorites
- Guest checkout

## Demo Access
You can explore the application using these demo accounts:

### Customer View
To experience the customer interface:
- Username: demo_user  
- Password: pizzatime
- Includes: Sample order history, saved payment methods

### Staff View
To access staff features:
- Username: demo_staff
- Password: pizzatime
- Enables: Order management, employee functions

Feel free to log in with either account to explore different aspects of the application.

## Deployment
The application is deployed on DigitalOcean App Platform.

### Environment Variables
Required for production:
```env
VITE_API_URL=https://your-api-domain.ondigitalocean.app/
```
Note: Environment variables in Vite must be accessed using `import.meta.env.VITE_API_URL`