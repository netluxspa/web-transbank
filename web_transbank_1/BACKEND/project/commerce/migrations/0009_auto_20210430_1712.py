# Generated by Django 3.2 on 2021-04-30 17:12

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0008_auto_20210429_2253'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pedido',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField(auto_now_add=True)),
                ('codigo_seguimiento', models.CharField(blank=True, default=uuid.uuid4, max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProductosPedido',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1)])),
                ('pedido', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='commerce.pedido')),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='commerce.producto')),
            ],
        ),
        migrations.AddField(
            model_name='pedido',
            name='productos',
            field=models.ManyToManyField(through='commerce.ProductosPedido', to='commerce.Producto'),
        ),
    ]