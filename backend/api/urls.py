# backend/api/urls.py
from django.urls import path
from .views import BookInfoView

urlpatterns = [
    path('book/<str:isbn>/', BookInfoView.as_view(), name='book-info'),
]