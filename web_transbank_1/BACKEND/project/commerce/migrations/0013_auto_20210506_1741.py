# Generated by Django 3.2 on 2021-05-06 17:41

from django.db import migrations, models
import django_cryptography.fields


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0012_pedido_tienda'),
    ]

    operations = [
        migrations.AddField(
            model_name='tienda',
            name='codigo_comercio',
            field=django_cryptography.fields.encrypt(models.CharField(default='597055555532', max_length=200)),
        ),
        migrations.AddField(
            model_name='tienda',
            name='llave_secreta',
            field=django_cryptography.fields.encrypt(models.CharField(default='579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C', max_length=200)),
        ),
    ]
