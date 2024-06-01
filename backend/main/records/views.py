from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.exceptions import AuthenticationFailed
from .models import Record
from .serializers import RecordSerializer
from rest_framework import status
from django.conf import settings
from functools import wraps


# Create your views here.


class RecordListCreateView(APIView):
    def post(self, request):
        if not request.user_id:
            raise AuthenticationFailed('Unauthenticated!')

        request.data['user'] = request.user_id
        serializer = RecordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def get(self, request):
        if not request.user_id:
            raise AuthenticationFailed('Unauthenticated!')

        records = Record.objects.filter(user=request.user_id)
        serializer = RecordSerializer(records, many=True)
        return Response(serializer.data)


class RecordRetrieveUpdateDeleteView(APIView):
    def get(self, request, pk):
        if not request.user_id:
            raise AuthenticationFailed('Unauthenticated!')

        record = self.get_record(pk, request.user_id)
        serializer = RecordSerializer(record)
        return Response(serializer.data)

    def put(self, request, pk):
        if not request.user_id:
            raise AuthenticationFailed('Unauthenticated')
        # Retrieve the record
        record = self.get_record(pk, request.user_id)

        # Check if the record belongs to the user
        if record.user_id != request.user_id:
            raise AuthenticationFailed('Unauthorized to update this record')

        request.data['user'] = request.user_id

        # Update the record with request data
        serializer = RecordSerializer(record, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    def delete(self, request, pk):
        if not request.user_id:
            raise AuthenticationFailed('Unauthenticated!')

        record = self.get_record(pk, request.user_id)
        record.delete()
        return Response({'message': 'Record deleted successfully'})

    def get_record(self, pk, user_id):
        try:
            return Record.objects.get(pk=pk, user=user_id)
        except Record.DoesNotExist:
            raise AuthenticationFailed('Record not found')


class TokenValidateView(APIView):
    def get(self, request):
        if not request.user_id:
            return Response({'detail': 'Token is invalid or has expired.'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'detail': 'User authenticated, Welcome!'}, status=status.HTTP_200_OK)
