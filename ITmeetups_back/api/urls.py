from django.urls import path
from api import views

urlpatterns = [
    # path('login/', views.Login.as_view()),
    path('posts/', views.PostsView.as_view()),
    path('posts/<int:pk>/', views.PostDetailView.as_view()),
    path('posts/<int:pk>/comments/<int:ck>/', views.CommentView.as_view()),
    path('posts/<int:pk>/comments/', views.CommentViewDetailed.as_view()),
    path('login/', views.login),
    path('logout', views.logout),
]
