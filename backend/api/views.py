from django.shortcuts import render

# backend/api/views.py
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class BookInfoView(APIView):
    """
    An API View that accepts an ISBN and returns book details
    from the Open Library API.
    """
    def get(self, request, isbn):
        # The URL for the Open Library API
        url = f"https://openlibrary.org/api/books?bibkeys=ISBN:{isbn}&format=json&jscmd=data"

        try:
            # Make the request to the external API
            response = requests.get(url)
            response.raise_for_status()  
            data = response.json()

            # Check if the API returned any data for the given ISBN
            book_key = f"ISBN:{isbn}"
            if book_key in data:
                book_data = data[book_key]
                # Format the data to send a clean response
                formatted_data = {
                    'title': book_data.get('title', 'N/A'),
                    'authors': [author['name'] for author in book_data.get('authors', [])],
                    'publish_date': book_data.get('publish_date', 'N/A'),
                    'publishers': [publisher['name'] for publisher in book_data.get('publishers', [])],
                    'number_of_pages': book_data.get('number_of_pages', 'N/A'),
                    'cover': book_data.get('cover', {}).get('large', 'N/A')
                }
                return Response(formatted_data, status=status.HTTP_200_OK)
            else:
                # If the book is not found in the Open Library response
                return Response({'error': 'Book with the provided ISBN not found.'}, status=status.HTTP_404_NOT_FOUND)

        except requests.exceptions.RequestException as e:
            # Handle network-related errors (e.g., timeout, connection error)
            return Response({'error': 'Failed to connect to external API.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
