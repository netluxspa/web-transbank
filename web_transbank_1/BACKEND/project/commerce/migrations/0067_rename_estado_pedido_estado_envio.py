# Generated by Django 3.2 on 2021-07-09 22:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0066_auto_20210709_1811'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pedido',
            old_name='estado',
            new_name='estado_envio',
        ),
    ]
