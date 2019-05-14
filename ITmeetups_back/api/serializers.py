from rest_framework import serializers
from .models import Post
from django.contrib.auth.models import User


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class PostSerializer(serializers.ModelSerializer):
    user = CurrentUserSerializer

    class Meta:
        model = Post
        fields = ('id', 'title', 'text', 'user')


