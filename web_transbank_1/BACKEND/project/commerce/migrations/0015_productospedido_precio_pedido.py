# Generated by Django 3.2 on 2021-05-15 20:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0014_pedido_userpagina'),
    ]

    operations = [
        migrations.AddField(
            model_name='productospedido',
            name='precio_pedido',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
