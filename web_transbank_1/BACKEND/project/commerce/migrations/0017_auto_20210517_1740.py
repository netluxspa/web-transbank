# Generated by Django 3.2 on 2021-05-17 17:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0016_pedido_estado_transaccion'),
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vci', models.CharField(max_length=50)),
                ('amount', models.CharField(max_length=50)),
                ('status', models.CharField(max_length=50)),
                ('buy_order', models.CharField(max_length=50)),
                ('session_id', models.CharField(max_length=50)),
                ('card_detail', models.CharField(max_length=50)),
                ('accounting_date', models.CharField(max_length=50)),
                ('transaction_date', models.CharField(max_length=50)),
                ('authorization_code', models.CharField(max_length=50)),
                ('payment_type_code', models.CharField(max_length=50)),
                ('response_code', models.CharField(max_length=50)),
                ('installments_number', models.CharField(max_length=50)),
            ],
        ),
        migrations.RemoveField(
            model_name='pedido',
            name='estado_transaccion',
        ),
        migrations.AddField(
            model_name='pedido',
            name='transaction',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='commerce.transaction'),
        ),
    ]
