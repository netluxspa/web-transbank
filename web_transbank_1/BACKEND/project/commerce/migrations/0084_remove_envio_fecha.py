# Generated by Django 3.2 on 2021-07-19 16:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0083_alter_envio_fecha'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='envio',
            name='fecha',
        ),
    ]
