# Generated by Django 3.2 on 2021-06-12 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0029_auto_20210608_1521'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pedido',
            name='ciudad',
        ),
        migrations.RemoveField(
            model_name='pedido',
            name='detalle',
        ),
        migrations.RemoveField(
            model_name='pedido',
            name='direccion',
        ),
        migrations.RemoveField(
            model_name='pedido',
            name='fono',
        ),
        migrations.RemoveField(
            model_name='pedido',
            name='nombre_receptor',
        ),
        migrations.AddField(
            model_name='pedido',
            name='numContact',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='pedido',
            name='valid_address',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]
