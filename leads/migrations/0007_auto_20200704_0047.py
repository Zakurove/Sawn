# Generated by Django 3.0.3 on 2020-07-03 21:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0006_auto_20200704_0036'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='respmicroimage',
            name='respMicro',
        ),
        migrations.AddField(
            model_name='respmicro',
            name='images',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='RespMicroImgs', to='leads.RespMicroImage'),
        ),
    ]
