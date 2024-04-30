from django.contrib.auth.models import AnonymousUser
from django.utils.deprecation import MiddlewareMixin
from rest_framework.exceptions import AuthenticationFailed
import jwt


class TokenMiddleware(MiddlewareMixin):
    def process_request(self, request):
        token = request.COOKIES.get('jwt')

        if token:
            try:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
                request.user_id = payload['id']
            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed('Unauthenticated!')
            except jwt.InvalidTokenError:
                raise AuthenticationFailed('Invalid token!')
        else:
            request.user_id = None
            request.user = AnonymousUser()
