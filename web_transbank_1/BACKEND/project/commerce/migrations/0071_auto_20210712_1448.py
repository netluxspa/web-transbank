# Generated by Django 3.2 on 2021-07-12 18:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0070_auto_20210712_1447'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='enviopedido',
            name='envio',
        ),
        migrations.RemoveField(
            model_name='enviopedido',
            name='pedido',
        ),
        migrations.DeleteModel(
            name='Envio',
        ),
        migrations.DeleteModel(
            name='EnvioPedido',
        ),
    ]
