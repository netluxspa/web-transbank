# Generated by Django 3.2 on 2021-06-23 15:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0054_auto_20210623_1006'),
    ]

    operations = [
        migrations.CreateModel(
            name='PoliticasEnvioGlobal',
            fields=[
                ('codigo', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('titulo', models.CharField(max_length=50)),
                ('descripcion', models.TextField()),
            ],
        ),
        migrations.AlterField(
            model_name='politicasenvio',
            name='politica_envio',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, to='commerce.politicasenvioglobal'),
            preserve_default=False,
        ),
    ]
