from django.db import models
from django.contrib.auth.models import User

# def upload_path(instance, filename):
#     return '/'.join(['RespMicro', str(instance.title), filename])
# def upload_pathh(instance, filename):
#     return '/'.join(['RespMicro', str(instance.title), filename])


# ----------------------------------------------------------------------------------------------



# Episode
class Episode(models.Model):
    awareness = models.CharField(max_length=20)
    duration = models.CharField(blank=True, null=True, max_length=200)
    disease = models.CharField(blank=True, null=True, max_length=100)
    type = models.CharField(blank=True, null=True, max_length=200)
    medications = models.CharField(blank=True, null=True, max_length=200)
    notes = models.TextField(blank=True, null=True, max_length=2000)
    datee = models.CharField(blank=True, null=True, max_length=200)
    condition = models.CharField(blank=True, null=True, max_length=200)
    owner_username = models.CharField(max_length=300, null=True)
    owner = models.ForeignKey(
        User, related_name="episode", on_delete=models.CASCADE, null=True)
    
    def save(self, *args, **kwargs):
        super(Episode, self).save(*args, **kwargs)


