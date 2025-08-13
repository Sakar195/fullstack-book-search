# 📚 Book Search App

A modern, responsive web application that allows users to search for books using ISBN numbers and retrieve detailed information from the Open Library API.



## ✨ Features

- 🔍 **ISBN Search**: Search for books using 10 or 13-digit ISBN numbers
- 📖 **Book Details**: View comprehensive book information including:
  - Title and authors
  - Publication date and publishers
  - Number of pages
  - Book cover images
- 📱 **Responsive Design**: Mobile-first design that works perfectly on all devices
- ⚡ **Fast API**: Quick responses with proper error handling
- 🎨 **Modern UI**: Clean, intuitive interface with loading states
- 📝 **Example ISBNs**: Pre-loaded examples for easy testing

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/) (React-based)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom responsive media queries
- **Image Optimization**: Next.js Image component with external image support
- **Deployment**: [Railway](https://railway.app/) (Free tier, no international card required)

### Backend

- **Framework**: [Django 5.2.4](https://www.djangoproject.com/) with Django REST Framework
- **Language**: Python 3.12
- **API**: RESTful API design
- **External API**: [Open Library API](https://openlibrary.org/developers/api) for book data
- **Server**: Gunicorn for production
- **Deployment**: [Railway](https://railway.app/) (Free tier, no international card required)

### DevOps & Deployment

- **Platform**: [Railway](https://railway.app/)
- **Containerization**: Docker (separate containers for frontend and backend)
- **CORS**: Configured for cross-origin requests
- **Environment Variables**: Secure configuration management


