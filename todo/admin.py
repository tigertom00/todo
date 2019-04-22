from django.contrib import admin
from .models import ToDoElements


class AdminToDoElements(admin.ModelAdmin):
    list_display = ('todo_text',
                    'done'
                    )


admin.site.register(ToDoElements, AdminToDoElements)
