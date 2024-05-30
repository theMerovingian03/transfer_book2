from django.urls import path
from .views import RecordListCreateView, RecordRetrieveUpdateDeleteView

urlpatterns = [
    path('', RecordListCreateView.as_view(), name='record-rc'),
    path('<int:pk>/', RecordRetrieveUpdateDeleteView.as_view(), name='record-rud'),
]
