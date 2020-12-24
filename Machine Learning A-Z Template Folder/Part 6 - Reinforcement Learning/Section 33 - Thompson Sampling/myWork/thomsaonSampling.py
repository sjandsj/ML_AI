#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon May 25 02:40:06 2020

@author: rails
"""


import numpy as np
import pandas as pd
import matplotlib.pyplot as mat
import random

dataset=pd.read_csv('Ads_CTR_Optimisation.csv')

N=10000
d=10

adsSelected=[]
totalNumberOfReward=0

numberOfRewardsForOne=[0]*d
numberOfRewardsForZero=[0]*d

for n in range(0, N):
    maxrandom=0
    ad=0
    for i in range(0,d):
        randomBeta=random.betavariate(numberOfRewardsForOne[i] +1, numberOfRewardsForZero[i]+1)
        if randomBeta>maxrandom:
            maxrandom=randomBeta
            ad = i
    adsSelected.append(ad)
    reward=dataset.values[n,ad]
    totalNumberOfReward=totalNumberOfReward+reward
    if reward == 1:
        numberOfRewardsForOne[ad]=numberOfRewardsForOne[ad]+1
    else:
        numberOfRewardsForZero[ad]=numberOfRewardsForZero[ad]+1
        
mat.hist(adsSelected)
mat.title('Thomson Sampling')
mat.xlabel('Ads')
mat.ylabel('Number of times ad was selected')        
        