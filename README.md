# 🌟 AWNews

AWNews is a web application that displays top news stories, allowing users to sort them by country and category. Users can search for articles, filter them by language and date, and sort by popularity, publication date, and relevance. The application features authentication, profile management, and CRUD operations for custom articles.

## Table of Contents

- [Technologies](#️-technologies)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Demo Video](#-demo-video)
- [Known Limitations](#️-known-limitations)
- [Data Source](#-data-source)
- [Additional Note](#additional-note)
- [Contact](#-contact)

## 🛠️ Technologies

This project utilizes the following technologies:

- **🔑 Auth0**: Handles authentication and user management.
- **📦 Redux Toolkit**: Simplifies state management in React applications.
- **📅 Day.js**: Provides date formatting and custom calendar features.
- **📝 React Hook Form**: Manages form handling and validation with ease.
- **🔄 React Paginate**: Implements pagination in React applications.
- **🌐 React Router DOM**: Manages routing in single-page applications (SPA).
- **🔔 React Toastify**: Provides customizable toast notifications.
- **🛡️ Zod**: Facilitates schema validation for form inputs.
- **🎨 Tailwind CSS**: Utility-first CSS framework for rapid UI development.

## 🌟 Features

- **📰 Top News Display**: View and sort top news by country and category.
- **🔍 Article Search**:
  - Search and filter articles by language, date, and sort by popularity, date, or relevance.
  - Custom calendar for date filtering using Day.js.
- **🔐 Authentication**: User registration and login with Auth0.
- **👤 Profile Management**: View and manage profile information.
- **✍️ Custom Articles**:
  - CRUD operations for user-generated articles.
  - Form validation using Zod.
  - Image previews before submission.
- **🔔 Notifications**: Real-time feedback using React Toastify for successful/unsuccessful actions.
- **📄 Pagination**: View more articles with pagination implemented by React Paginate.
- **🔗 SPA Navigation**: Seamless navigation using React Router DOM with URL parameter synchronization.
- **🎨 Tailwind CSS**: Custom components and responsive design.

## 🚀 Getting Started

Follow these steps to run the application locally:

1. **📥 Clone the repository**:

   ```sh
   git clone https://github.com/yuriiyablonskyi/awnews
   ```

2. **📂 Navigate to the project directory**:

   ```sh
   cd awnews
   ```

3. **📦 Install dependencies**:

   ```sh
   npm install
   ```

4. **▶️ Start the project**:

   ```sh
   npm run dev
   ```

5. **🌐 Open the application** in your preferred browser.

### Troubleshooting

If you encounter any issues, make sure you have Node.js and npm installed. Check the versions required in `package.json`.

## 🎥 Demo Video

Watch a 2-minute demo of the application [YouTube](https://youtu.be/HRyAzqeLgs8?si=xwQ4wq6h20jbTnv6).

## ⚠️ Known Limitations

- The free version of the server API restricts requests to be made from `localhost` only.
- There are limitations on searching for older articles and pagination in the free version of the API.

## 🌐 Data Source

Data for the news articles is provided by News API [newsapi](https://newsapi.org).

## Additional Note

The website showcases top news articles fetched from a server on the homepage. Users can sort these articles by country and category. There is also a search page where articles can be filtered by language and date (with a custom calendar built using Day.js). Articles can be sorted by popularity, publication date, and relevance. Keyword input is required for searching.

Authentication and registration are managed with Auth0, enabling logged-in users to view profile information and create custom articles. These users can perform CRUD operations on their articles, with form validation handled by Zod. During article creation, an image preview is shown once the image is successfully uploaded. Real-time notifications using React Toastify inform users of successful or unsuccessful actions, such as article creation, deletion, or search results. These notifications are implemented using Redux Toolkit middleware, which intercepts specific Redux events and displays messages accordingly.

Navigation across the site is seamless due to React Router DOM, with URL parameter synchronization ensuring that filter parameters persist through page reloads. Pagination for viewing additional articles is implemented with React Paginate. Styling is achieved with Tailwind CSS, with some components built using Tailwind's utility classes. The entire codebase is written in TypeScript, ensuring type safety throughout the application.

## 📬 Contact

- **📧 Email**: yuriiyablonskyi.i@gmail.com
- **🐱 GitHub**: [GitHub](https://github.com/yuriiyablonskyi/awnews)
- **🔗 LinkedIn**: [LinkedIn](https://www.linkedin.com/in/yurii-yablonskyi)

---

_This application was created as a learning project to improve development skills._
