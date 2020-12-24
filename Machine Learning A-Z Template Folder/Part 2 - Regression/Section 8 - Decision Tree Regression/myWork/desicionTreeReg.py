#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon May  4 01:32:25 2020

@author: rails
"""


import numpy as np
import pandas as pd
import matplotlib.pyplot as mat

dataset = pd.read_csv('Position_Salaries.csv')
x=dataset.iloc[:,1:2].values
y=dataset.iloc[:, 2].values

from sklearn.tree import DecisionTreeRegressor
regressor=DecisionTreeRegressor(random_state=0)
regressor.fit(x, y)

y_predict=regressor.predict([[6.5]])

x_grid=np.arange(min(x), max(x), 0.001)
x_grid=x_grid.reshape(len(x_grid), 1)
mat.scatter(x, y, color= 'red')
mat.plot(x_grid, regressor.predict(x_grid), color='black')
mat.title('Decision Tree Regression')
mat.xlabel('Position Level')
mat.ylabel('Salary')
mat.show()