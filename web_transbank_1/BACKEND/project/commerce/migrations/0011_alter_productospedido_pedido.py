# Generated by Django 3.2 on 2021-04-30 19:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0010_alter_pedido_productos'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productospedido',
            name='pedido',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='commerce.pedido'),
        ),
    ]
