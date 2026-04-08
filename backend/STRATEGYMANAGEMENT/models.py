from django.db import models

# Create your models here.

class Strategy(models.Model):
    name=models.CharField(max_length=200)
    start_date=models.DateField()
    end_date=models.DateField()

class StrategicObjective(models.Model):
    PERSPECTIVES=[
        ("Financial","Financial"),
        ("Customer","Customer"),
        ("Internal Process","Internal Process"),
        ("Learning & Growth","Learning & Growth")
    ]
    strategy=models.ForeignKey(Strategy,on_delete=models.CASCADE,related_name="startegy_objectives")
    objective=models.CharField(max_length=300)
    perspective=models.CharField(max_length=100, choices=PERSPECTIVES, null=True,blank=True)