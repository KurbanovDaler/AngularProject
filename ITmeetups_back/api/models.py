from django.db import models
from django.contrib.auth.models import User, UserManager
# Create your models here.


class Post(models.Model):
    title = models.CharField(max_length=400)
    text = models.CharField(max_length=5000)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)



