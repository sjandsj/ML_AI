#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Apr 27 05:20:04 2020

@author: rails
"""


import numpy as np
import pandas as pd
import matplotlib.pyplot as mat

dataset = pd.read_csv('Position_Salaries.csv')
x=dataset.iloc[:,1:2].values
y=dataset.iloc[:, 2].values

from sklearn.preprocessing import StandardScaler
ssX= StandardScaler()
x=ssX.fit_transform(x)
ssY=StandardScaler()
y=ssY.fit_transform([y])
y=y.reshape(10, 1)

from sklearn.svm import SVR
regressor=SVR(kernel='rbf')
regressor.fit(x,y)

y_predict=regressor.predict(np.array([[6.5]]))

x_grid=np.arange(min(x),max(x), 0.1)
x_grid = x_grid.reshape(len(x_grid), 1)
mat.scatter(x, y, color='red')
mat.plot(x_grid, regressor.predict(x_grid), color='green')
mat.title('Salary vs Experience')
mat.xlabel('Experience')
mat.ylabel('Salary')
mat.show()