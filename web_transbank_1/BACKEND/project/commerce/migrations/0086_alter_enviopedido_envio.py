# Generated by Django 3.2 on 2021-07-22 00:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0085_envio_fecha'),
    ]

    operations = [
        migrations.AlterField(
            model_name='enviopedido',
            name='envio',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pedidos', to='commerce.envio'),
        ),
    ]
