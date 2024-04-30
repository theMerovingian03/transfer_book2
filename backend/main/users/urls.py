from django.urls import path
from .views import LoginView, RegisterView, UserView, LogoutView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', UserView.as_view(), name='userview'),
    path('logout/', LogoutView.as_view(), name='logout'),

]
