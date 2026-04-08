from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE
import datetime
from ORGDATA.models import *

from django.http import request


# Create your models here.

class LeaveReq(models.Model):
    empcode = models.CharField(max_length=50)
    daystaken = models.FloatField()


class ResidentialAddress(models.Model):
    employee = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=150)


class UserData(models.Model):
    employee = models.OneToOneField(User, on_delete=models.CASCADE)
    middlename = models.CharField(max_length=50, null=True)
    national_ID = models.CharField(max_length=20, null=True)
    DOB=models.DateField(null=True,blank=True)
    postal_address = models.CharField(max_length=50,null=True)
    mobile_number = models.CharField(max_length=20,null=True)
    mobile_number2 = models.CharField(max_length=20, null=True)
    gender = models.CharField(max_length=10, null=True)
    status = models.CharField(max_length=10, null=True)
    department = models.CharField(max_length=50,null=True)
    related_department = models.ForeignKey(Departments, on_delete=models.DO_NOTHING, related_name='related_department', null=True)
    section = models.ForeignKey(Sections, on_delete=models.DO_NOTHING, related_name='related_section', null=True)
    sub_section = models.ForeignKey(SubSections, on_delete=models.DO_NOTHING, related_name='related_subsection', null=True)
    supervisor = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='supervisot', null=True)
    empcode = models.CharField(max_length=50, default='None')
    offcielocation = models.CharField(max_length=100, default='None')
    job_profile=models.ForeignKey(job_Profiles,on_delete=models.DO_NOTHING,related_name='profile',null=True)
    # UI control values
    invoicesubmission_officer = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.employee.first_name}  {self.employee.last_name}'



class Residential_Address(models.Model):
    employee=models.OneToOneField(User,on_delete=CASCADE, related_name="residential_address")
    city_village_town=models.CharField(max_length=100)
    location_ward=models.CharField(max_length=100)
    street_name=models.CharField(max_length=100)
    plot_number=models.CharField(max_length=30)

    def __str__(self):
        return f'{self.city_village_town} {self.location_ward} {self.street_name} {self.plot_number}'


class Postal_Address(models.Model):
    employee=models.OneToOneField(User,on_delete=CASCADE,related_name="postal_address")
    city_town_village=models.CharField(max_length=100)
    post_number=models.CharField(max_length=30)

    def __str__(self):
        return f'{self.post_number} {self.city_town_village}'








    
