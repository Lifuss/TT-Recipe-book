# Recipe Book – Fullstack Test Project

This is a fullstack test project that includes both a **Frontend (Next.js + TypeScript)** and a **Backend (Express.js + TypeScript)**.  
The app allows users to browse, search, and filter recipes using the [TheMealDB API](https://www.themealdb.com/api.php).

## 🧰 Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- Axios

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Lifuss/TT-Recipe-book.git
cd <repository_folder>
```
### 2. Install dependencies
Backend:
```bash
cd be
npm install
```
Frontend:
```bash
cd ../fe
npm install
```

## Environment Variables
Backend (be/.env)
```env
PORT=4000
NODE_ENV=development
```
Frontend (FE/.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000  // port must be the same as be/.env PORT
```

## Running the App
Start Backend
```bash
cd BE
npm run dev
```
Server runs at: http://localhost:4000

 Start Frontend
```bash
cd FE
npm run dev
```
Frontend runs at: http://localhost:3000

## Project Notes
- The frontend and backend are kept in separate folders as per requirements.

- Environment variables are used to configure API base URL and port.

- The backend acts as a proxy and data adapter for TheMealDB API.

- The frontend consumes only the internal API (from /api/recipes).

## Backend API Endpoints
### `GET /api/recipes`
Fetch available recipes, with optional filtering.
Query Parameters:
- s – search by name
- i – filter by ingredient
- a – filter by area (country)
- c – filter by category
Examples:
```bash
GET /api/recipes
GET /api/recipes?s=chicken
GET /api/recipes?i=rice
GET /api/recipes?a=Canadian
GET /api/recipes?c=Seafood
```
### `GET /api/recipes`
Fetch detailed info about a specific recipe.
```bash
GET /api/recipes/52772
```

## Author
Arsen Hryhoriak
