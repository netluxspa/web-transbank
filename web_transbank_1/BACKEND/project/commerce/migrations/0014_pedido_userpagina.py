# Generated by Django 3.2 on 2021-05-14 20:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pag', '0009_userpagina_is_active'),
        ('commerce', '0013_auto_20210506_1741'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='userPagina',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='pag.userpagina'),
            preserve_default=False,
        ),
    ]