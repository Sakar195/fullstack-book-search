# 📚 Book Search App

A modern, responsive web application that allows users to search for books using ISBN numbers and retrieve detailed information from the Open Library API.

## 🌐 Live Demo

- **Frontend**: [https://booksearch.up.railway.app](https://booksearch.up.railway.app)
- **Backend API**: [https://backend-booksearch.up.railway.app](https://backend-booksearch.up.railway.app)

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

## 📂 Project Structure

```
BookSearchApp/
├── frontend/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom React hooks
│   │   └── types/           # TypeScript type definitions
│   ├── public/              # Static assets
│   ├── Dockerfile           # Frontend container
│   └── package.json         # Frontend dependencies
│
├── backend/                 # Django Backend
│   ├── core/                # Django project settings
│   ├── api/                 # API application
│   ├── Dockerfile           # Backend container
│   ├── requirements.txt     # Python dependencies
│   └── manage.py            # Django management
│
├── docker-compose.yml       # Local development setup
└── README.md               # Project documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.12+
- Docker (optional)

### Local Development

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

#### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

#### Docker Setup (Recommended)

```bash
# Run both frontend and backend
docker-compose up --build
```

## 🌐 API Endpoints

### Base URL

- **Production**: `https://backend-booksearch.up.railway.app`
- **Local**: `http://localhost:8000`

### Endpoints

#### Health Check

```http
GET /api/health/
```

Returns the API status.

#### Book Search

```http
GET /api/book/{isbn}/
```

Retrieve book information by ISBN.

**Parameters:**

- `isbn` (string): 10 or 13-digit ISBN number

**Response Example:**

```json
{
  "title": "Fantastic Mr. Fox",
  "authors": ["Roald Dahl"],
  "publish_date": "October 1, 1988",
  "publishers": ["Puffin"],
  "number_of_pages": 96,
  "cover": "https://covers.openlibrary.org/b/id/8739161-L.jpg"
}
```

## 🎯 Why Railway?

This project is deployed on [Railway](https://railway.app/) because:

- ✅ **Free Tier Available**: No cost for small projects
- ✅ **No International Card Required**: Unlike some other platforms
- ✅ **Easy Deployment**: Git-based deployment workflow
- ✅ **Docker Support**: Native container deployment
- ✅ **Environment Variables**: Secure configuration management
- ✅ **Custom Domains**: Free custom domain support
- ✅ **Automatic HTTPS**: Built-in SSL certificates

## 📱 Responsive Design

The app features a mobile-first responsive design with:

- **Mobile** (< 640px): Single-column layout, stacked forms
- **Tablet** (640px - 768px): Two-column grids
- **Desktop** (> 768px): Multi-column layouts with optimized spacing
- **Touch-friendly**: 44px minimum touch targets on mobile devices

## 🛡️ Features & Security

- **Input Validation**: ISBN format validation (10 or 13 digits)
- **Error Handling**: Comprehensive error messages and loading states
- **CORS Configuration**: Properly configured for cross-origin requests
- **Rate Limiting**: Built-in protection via external API limits
- **Responsive Images**: Optimized loading with Next.js Image component

## 🔧 Configuration

### Environment Variables

#### Frontend

```env
NEXT_PUBLIC_API_URL=https://backend-booksearch.up.railway.app
```

#### Backend

```env
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=localhost,backend-booksearch.up.railway.app
RAILWAY_FRONTEND_URL=https://booksearch.up.railway.app
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Author

**Sakar195**

- GitHub: [@Sakar195](https://github.com/Sakar195)
- Repository: [fullstack-book-search](https://github.com/Sakar195/fullstack-book-search)

## 🙏 Acknowledgments

- [Open Library](https://openlibrary.org/) for providing the book data API
- [Railway](https://railway.app/) for the free hosting platform
- [Next.js](https://nextjs.org/) and [Django](https://www.djangoproject.com/) teams for the excellent frameworks

---

⭐ **Star this repository if you found it helpful!**
