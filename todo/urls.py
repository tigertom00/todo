from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic.base import TemplateView
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='todo/index.html'), name='todo'),
    path('api-auth/', include('rest_framework.urls')),
    re_path(r'^todo/api$', views.ToDoListView.as_view(), name='todoapi'),
    re_path(r'^todo/api/(?P<pk>[0-9]+)/',
            views.ToDoDetailView.as_view(), name='tododetialapi'),
]
