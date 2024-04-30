from rest_framework import serializers
from .models import Record


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ['id', 'user', 'title', 'amount', 'date_added', 'date_payed']
