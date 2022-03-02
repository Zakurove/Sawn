from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import EpisodeViewSet
from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()

#Set
router.register('api/episodes', EpisodeViewSet, 'episode')
# router.register('api/clusters', ClusterViewSet, 'cluster')

urlpatterns = [
    path('', include(router.urls)),
] 
urlpatterns += static( settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
