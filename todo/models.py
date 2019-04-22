from django.db import models
from django.utils import timezone


class ToDoElements(models.Model):
    todo_text = models.CharField(max_length=50)
    todo_desc = models.CharField(max_length=500)
    done = models.BooleanField()
    created_date = models.DateTimeField(default=timezone.now)
