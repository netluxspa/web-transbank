# Generated by Django 3.2 on 2021-04-29 22:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0007_producto_descripcion'),
    ]

    operations = [
        migrations.CreateModel(
            name='Parrafo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('parrafo', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='TextoProducto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('texto', models.CharField(max_length=200)),
                ('parrafos', models.ManyToManyField(blank=True, to='commerce.Parrafo')),
            ],
        ),
        migrations.AddField(
            model_name='producto',
            name='textos',
            field=models.ManyToManyField(blank=True, to='commerce.TextoProducto'),
        ),
    ]
