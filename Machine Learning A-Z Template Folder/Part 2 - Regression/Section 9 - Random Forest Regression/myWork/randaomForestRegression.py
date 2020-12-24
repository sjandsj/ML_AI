#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon May  4 05:28:15 2020

@author: rails
"""


import numpy as np
import pandas as pd
import matplotlib.pyplot as mat

dataset = pd.read_csv('Position_Salaries.csv')
x=dataset.iloc[:,1:2].values
y=dataset.iloc[:, 2].values

from sklearn.ensemble import RandomForestRegressor
regressor = RandomForestRegressor(n_estimators=300, random_state=0)
regressor.fit(x,y)

yPredict=regressor.predict([[6.5]])

xGrid=np.arange(min(x), max(x), 0.01)
xGrid=xGrid.reshape(len(xGrid), 1)
mat.scatter(x, y, color= 'green')
mat.scatter(6.5, yPredict, color= 'red')
mat.plot(xGrid, regressor.predict(xGrid))
mat.xlabel("Position level")
mat.ylabel("Salary")
mat.title("Random Forest")
mat.show()