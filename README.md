# BazaarShinka Frontend

This is the **React.js frontend** for the **BazaarShinka** web application — an eCommerce platform for buying and delivering products.  
Built with **Vite** for fast development and optimized builds.

---

## 🚀 Tech Stack

- **React.js** – frontend framework
- **Vite** – fast bundler and dev server
- **Axios** – for API communication
- **React Router** – for routing
- **Custom CSS / SCSS / Tailwind** – for styling (modify if you're using one)

---

## 📁 Project Structure

bazaarShinka-front/
│
├── public/ # Static files
├── src/
│ ├── assets/ # Images, fonts
│ ├── components/ # Reusable UI components
│ ├── pages/ # Route-based pages
│ ├── App.jsx # Root component
│ ├── main.jsx # Entry point
│ └── ...
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md # You're reading it now

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/bazaarshinka-front.git
cd bazaarshinka-front
2. Install dependencies
bash
Copy
Edit
npm install
3. Start development server
bash
Copy
Edit
npm run dev
Then open: http://localhost:5173

📦 Build for production
bash
Copy
Edit
npm run build
The build will be output to the dist/ folder.

To preview the production build locally:

bash
Copy
Edit
npm run preview
🌐 API Connection
This frontend connects to the following backend:

arduino
Copy
Edit
https://misho.pythonanywhere.com/api/
Make sure the backend is running and accessible.

🛍️ Features
🧺 Product browsing and category filtering

➕ Add to cart functionality

🚚 Delivery option selection

📦 Order confirmation form

🔄 Dynamic fetching from REST API

💻 Responsive layout

✅ Environment Requirements
Node.js (v16+ recommended)

NPM (v7+)

Modern browser (Chrome, Firefox, Edge)
