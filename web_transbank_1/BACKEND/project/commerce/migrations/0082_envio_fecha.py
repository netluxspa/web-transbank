# Generated by Django 3.2 on 2021-07-18 22:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0081_alter_enviopedido_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='envio',
            name='fecha',
            field=models.DateField(blank=True, null=True),
        ),
    ]
