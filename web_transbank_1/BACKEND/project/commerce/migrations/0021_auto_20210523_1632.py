# Generated by Django 3.2 on 2021-05-23 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0020_pedido_token_ws'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='main_status',
            field=models.BooleanField(default=1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='pedido',
            name='num_orden',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='accounting_date',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='amount',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='authorization_code',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='buy_order',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='card_detail',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='installments_number',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='payment_type_code',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='response_code',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='session_id',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='status',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='transaction_date',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='vci',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterUniqueTogether(
            name='pedido',
            unique_together={('num_orden', 'tienda')},
        ),
        migrations.AlterIndexTogether(
            name='pedido',
            index_together={('num_orden', 'tienda')},
        ),
        migrations.RemoveField(
            model_name='pedido',
            name='token_ws',
        ),
    ]
