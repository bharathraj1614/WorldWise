# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 🌍 WorldWise

> A smart travel tracking app to log the places you've been and plan your future journeys—built with React, styled with custom UI, and powered by geolocation APIs. Part of my React learning journey 🚀

![WorldWise Banner](https://github.com/bharathraj1614/WorldWise/public/logo.png)

---

## ✨ Overview

**WorldWise** helps you track and visualize your travel history. Add cities you've visited, note down memories, and see them beautifully marked on a map.

### ✅ Features

- 🗺️ Interactive map using **React Leaflet**
- 📍 Add new places with details like country, date, and notes
- 🧠 Smart reverse geocoding to fetch country & location names
- 🔄 Persistent state with **localStorage**
- ⚡ Fast, responsive, and mobile-friendly UI
- 💾 Offline support for saved travel logs

---

## 🔧 Tech Stack

| Frontend | Libraries & Tools        | Styling     |
| -------- | ------------------------ | ----------- |
| React    | React Leaflet            | CSS Modules |
| Vite     | Date-fns (date handling) | Custom CSS  |
| JSX/TSX  | Reverse Geocoding APIs   |             |

---

## 🚀 Getting Started

To run this project locally:

```bash
# 1. Clone the repo
git clone https://github.com/bharathraj1614/WorldWise.git

# 2. Go into the project directory
cd WorldWise

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

---

## 🌍 How It Works

1. Zoom and click anywhere on the map
2. A city form pops up — fill in your experience
3. Your visited city is saved and shown on the map
4. Data is stored in `localStorage` so you never lose your entries

---

## 📸 Screenshots

| Map View                                                                | Add City                                                             | Logged Cities                                                            |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| ![map](https://github.com/bharathraj1614/WorldWise/assets/CityList.png) | ![form](https://github.com/bharathraj1614/WorldWise/assets/Form.png) | ![list](https://github.com/bharathraj1614/WorldWise/assets/CityList.png) |

---

## 🎯 Learning Goals

This project was built as part of my **React mastery journey**. Key learning highlights include:

- Component-based UI design
- Managing complex state using hooks
- Side effects and data fetching
- Working with external APIs (Geocoding, Country info)
- LocalStorage integration
- Building responsive UIs from scratch

---

## 📁 Folder Structure

```
WorldWise/
│
├── public/           # Static files
├── src/
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── contexts/     # App-wide context providers
│   ├── services/     # API-related utilities
│   └── App.jsx       # Main app logic
│
└── README.md
```

---

## 🤝 Contributing

Want to improve something or have feedback? Feel free to open an issue or fork and submit a PR. Contributions are always welcome!

---

## 🧠 Inspiration

Inspired by world travel journaling apps and [The Ultimate React Course](<[reactcourse.com/](https://www.udemy.com/course/the-ultimate-react-course)>) — putting theory into practice one project at a time.

---

## 📬 Contact

📧 bharathraj1614@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/bharathraj1614)  
📂 [My Portfolio (coming soon...)]()

---

## ⭐ If you liked this project...

Please consider giving it a star ⭐ on GitHub—it helps others discover it and supports my journey as a developer 💪

---

> Made with ❤️ by Bharath Raj while learning React.
