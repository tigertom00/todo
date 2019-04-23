from django.db import models
from django.utils import timezone


class ToDoElements(models.Model):
    todo_text = models.CharField(max_length=50, blank=True)
    todo_desc = models.CharField(max_length=500, blank=True)
    done = models.BooleanField()
    created_date = models.DateTimeField(default=timezone.now)
