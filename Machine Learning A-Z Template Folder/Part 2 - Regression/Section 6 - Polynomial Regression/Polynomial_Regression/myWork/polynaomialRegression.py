#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Apr 25 23:40:16 2020

@author: rails
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as mat

dataset = pd.read_csv('Position_Salaries.csv')
x=dataset.iloc[:,1:2].values
y=dataset.iloc[:, 2].values

from sklearn.linear_model import LinearRegression
linearRregressor=LinearRegression()
linearRregressor.fit(x,y)

from sklearn.preprocessing import PolynomialFeatures
polynomialRegreassor = PolynomialFeatures(4)
x_poly = polynomialRegreassor.fit_transform(x)

poly_linear_Regressor = LinearRegression()
poly_linear_Regressor.fit(x_poly, y)

mat.scatter(x, y, color='black')
mat.plot(x, linearRregressor.predict(x), color='green')
mat.title('Salary vs Experience')
mat.xlabel('Experience')
mat.ylabel('Salary')
mat.show()

x_grid=np.arange(min(x),max(x), 0.1)
x_grid = x_grid.reshape(len(x_grid), 1)
mat.scatter(x, y, color='red')
mat.plot(x_grid, poly_linear_Regressor.predict(polynomialRegreassor.fit_transform(x_grid)), color='green')
mat.title('Polynomial Graph')
mat.xlabel('Position Level')
mat.ylabel('Salary')
mat.show()

linearPrediction=linearRregressor.predict([[6.5]])

polynomialPrediction=poly_linear_Regressor.predict(polynomialRegreassor.fit_transform([[6.5]]))