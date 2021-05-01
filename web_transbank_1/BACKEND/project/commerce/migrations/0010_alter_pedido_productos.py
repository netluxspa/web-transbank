# Generated by Django 3.2 on 2021-04-30 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0009_auto_20210430_1712'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pedido',
            name='productos',
            field=models.ManyToManyField(blank=True, through='commerce.ProductosPedido', to='commerce.Producto'),
        ),
    ]
