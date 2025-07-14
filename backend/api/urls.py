# backend/api/urls.py
from django.urls import path
from .views import BookInfoView, HealthCheckView

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('book/<str:isbn>/', BookInfoView.as_view(), name='book-info'),
]