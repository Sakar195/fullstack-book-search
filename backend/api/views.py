from django.shortcuts import render

# backend/api/views.py
import requests
import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse

logger = logging.getLogger(__name__)

class HealthCheckView(APIView):
    """
    Simple health check endpoint
    """
    def get(self, request):
        return Response({
            'status': 'healthy',
            'message': 'Backend is running successfully'
        }, status=status.HTTP_200_OK)

class BookInfoView(APIView):
    """
    An API View that accepts an ISBN and returns book details
    from the Open Library API.
    """
    def get(self, request, isbn):
        logger.info(f"Received request for ISBN: {isbn}")
        
        # Validate ISBN format
        if not isbn or not isinstance(isbn, str):
            return Response(
                {'error': 'Invalid ISBN format'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Clean ISBN (remove any dashes or spaces)
        clean_isbn = ''.join(filter(str.isdigit, isbn))
        if not clean_isbn or len(clean_isbn) not in [10, 13]:
            return Response(
                {'error': 'ISBN must be 10 or 13 digits'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # The URL for the Open Library API
        url = f"https://openlibrary.org/api/books?bibkeys=ISBN:{isbn}&format=json&jscmd=data"
        logger.info(f"Making request to: {url}")

        try:
            # Make the request to the external API
            response = requests.get(url, timeout=10)
            response.raise_for_status()  
            data = response.json()
            logger.info(f"Open Library response: {data}")

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
                logger.info(f"Returning formatted data: {formatted_data}")
                return Response(formatted_data, status=status.HTTP_200_OK)
            else:
                # If the book is not found in the Open Library response
                logger.warning(f"Book not found for ISBN: {isbn}")
                return Response({'error': 'Book with the provided ISBN not found.'}, status=status.HTTP_404_NOT_FOUND)

        except requests.exceptions.Timeout:
            logger.error(f"Timeout when fetching book data for ISBN: {isbn}")
            return Response({'error': 'Request timeout. Please try again.'}, status=status.HTTP_408_REQUEST_TIMEOUT)
        except requests.exceptions.RequestException as e:
            # Handle network-related errors (e.g., timeout, connection error)
            logger.error(f"Request exception for ISBN {isbn}: {str(e)}")
            return Response({'error': 'Failed to connect to external API.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        except Exception as e:
            # Handle any other unexpected errors
            logger.error(f"Unexpected error for ISBN {isbn}: {str(e)}")
            return Response({'error': 'Internal server error.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
