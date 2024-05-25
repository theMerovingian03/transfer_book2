from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, NotFound
from .models import User
import jwt
import datetime

# Create your views here.


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.now() + datetime.timedelta(minutes=60)
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()
        response.set_cookie(key='jwt', value=token,
                            httponly=True, samesite='LAX', secure=True)
        response.data = {
            'jwt': token
        }

        return response


class UserView(APIView):
    def get(self, request):
        if not request.user_id:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            user = User.objects.get(id=request.user_id)
        except User.DoesNotExist:
            raise NotFound('User not found.')

        serializer = UserSerializer(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()

        try:
            if request.COOKIES.get('jwt'):
                response.delete_cookie('jwt')
                response.data = {
                    'message': 'Logged out successfully!'
                }
            else:
                raise ValueError('No JWT cookie found')
        except ValueError as e:
            response.data = {
                'message': 'You are already logged out!'
            }

        return response
