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

    def get(self, request):
        return Response({
            'status': 'healthy',
            'message': 'Backend is running successfully'
        }, status=status.HTTP_200_OK)

class BookInfoView(APIView):

    def get(self, request, isbn):
        logger.info(f"Received request for ISBN: {isbn}")

        if not isbn or not isinstance(isbn, str):
            return Response(
                {'error': 'Invalid ISBN format'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        clean_isbn = ''.join(filter(str.isdigit, isbn))
        if not clean_isbn or len(clean_isbn) not in [10, 13]:
            return Response(
                {'error': 'ISBN must be 10 or 13 digits'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
  
        url = f"https://openlibrary.org/api/books?bibkeys=ISBN:{isbn}&format=json&jscmd=data"
        logger.info(f"Making request to: {url}")

        try:
        
            response = requests.get(url, timeout=10)
            response.raise_for_status()  
            data = response.json()
            logger.info(f"Open Library response: {data}")

      
            book_key = f"ISBN:{isbn}"
            if book_key in data:
                book_data = data[book_key]
           
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
                logger.warning(f"Book not found for ISBN: {isbn}")
                return Response({'error': 'Book with the provided ISBN not found.'}, status=status.HTTP_404_NOT_FOUND)

        except requests.exceptions.Timeout:
            logger.error(f"Timeout when fetching book data for ISBN: {isbn}")
            return Response({'error': 'Request timeout. Please try again.'}, status=status.HTTP_408_REQUEST_TIMEOUT)
        except requests.exceptions.RequestException as e:

            logger.error(f"Request exception for ISBN {isbn}: {str(e)}")
            return Response({'error': 'Failed to connect to external API.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        except Exception as e:

            logger.error(f"Unexpected error for ISBN {isbn}: {str(e)}")
            return Response({'error': 'Internal server error.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
