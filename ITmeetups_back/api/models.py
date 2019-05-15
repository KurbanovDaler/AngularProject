from django.db import models
from django.contrib.auth.models import User, UserManager
# Create your models here.


class Post(models.Model):
    title = models.CharField(max_length=400)
    text = models.CharField(max_length=5000)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)


class Comment(models.Model):
    text = models.CharField(max_length=400)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)
