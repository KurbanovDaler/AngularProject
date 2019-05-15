from rest_framework import serializers
from .models import Post, Comment, Like
from django.contrib.auth.models import User


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class PostSerializer(serializers.ModelSerializer):
    user = CurrentUserSerializer()

    class Meta:
        model = Post
        fields = ('id', 'title', 'text', 'user', 'created_at')

class PostSerializer2(serializers.ModelSerializer):
    user = CurrentUserSerializer

    class Meta:
        model = Post
        fields = ('id', 'title', 'text', 'user', 'created_at')


class CommentSerializer(serializers.ModelSerializer):

    user = CurrentUserSerializer()
    post = PostSerializer()

    class Meta:
        model = Comment
        fields = ('id', 'text', 'user', 'post', 'created_at')

class CommentSerializer2(serializers.ModelSerializer):
    
    user = CurrentUserSerializer
    post = PostSerializer

    class Meta:
        model = Comment
        fields = ('id', 'text', 'user', 'post', 'created_at')

class LikeSerializer(serializers.ModelSerializer):
    user = CurrentUserSerializer
    post = PostSerializer

    class Meta:
        model = Like
        fields = ('id', 'user', 'post', 'created_at')
    

