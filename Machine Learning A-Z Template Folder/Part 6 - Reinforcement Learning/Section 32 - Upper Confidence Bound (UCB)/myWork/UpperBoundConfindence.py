#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri May 22 01:03:16 2020

@author: rails
"""


import numpy as np
import pandas as pd
import matplotlib.pyplot as mat
from math import sqrt, log

dataset=pd.read_csv('Ads_CTR_Optimisation.csv')

N=10000
d=10
adsSelected=[]
totalNumberOfReward=0

numberOfSelections=[0] * d
sumOfRewards=[0] * d
for n in range(0, N):
    ad=0
    maxUpperBound=0
    for i in range(0,d):
        if (numberOfSelections[i] > 0) :
            averageReward = sumOfRewards[i] / numberOfSelections[i]
            deltaI = sqrt(3/2*log(n+1)/numberOfSelections[i])
            upperBound = averageReward+deltaI
        else :
            upperBound = 1e400
        if upperBound > maxUpperBound :
            maxUpperBound=upperBound
            ad = i
    adsSelected.append(ad)
    numberOfSelections[ad]=numberOfSelections[ad]+1
    reward = dataset.values[n, ad]
    sumOfRewards[ad]=sumOfRewards[ad]+reward
    totalNumberOfReward = totalNumberOfReward+reward
    

mat.hist(adsSelected)
mat.title('Ads Selected')
mat.xlabel('Ads')
mat.ylabel('Number of times selected')
mat.show()    