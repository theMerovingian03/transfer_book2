from django.contrib.auth.models import AnonymousUser
from django.utils.deprecation import MiddlewareMixin
from rest_framework.exceptions import AuthenticationFailed
import jwt


class TokenMiddleware(MiddlewareMixin):
    def process_request(self, request):
        token = None

        # Check if Authorization header is present
        authorization_header = request.headers.get('Authorization')
        if authorization_header and authorization_header.startswith('Bearer '):
            token = authorization_header.split(' ')[1]
            print("Authorization header parsed for token")

        # If Authorization header is not present, check for cookies
        if not token:
            token = request.COOKIES.get('jwt')
            if token:
                print("Cookie received")
            else:
                print("No cookie")

        if token:
            try:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
                request.user_id = payload['id']
            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed('Unauthenticated!')
            except (jwt.InvalidTokenError, jwt.DecodeError):
                raise AuthenticationFailed('Invalid token!')
        else:
            request.user_id = None
            request.user = AnonymousUser()
