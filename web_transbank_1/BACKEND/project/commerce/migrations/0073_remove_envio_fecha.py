# Generated by Django 3.2 on 2021-07-12 18:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0072_envio_enviopedido'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='envio',
            name='fecha',
        ),
    ]
