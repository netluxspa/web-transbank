# Generated by Django 3.2 on 2021-07-25 04:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0088_alter_pedido_fecha'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pedido',
            name='fecha',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
