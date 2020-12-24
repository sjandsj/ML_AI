#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Apr 16 01:06:41 2020

@author: rails
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as mat

dataset = pd.read_csv('Salary_Data.csv')
x=dataset.iloc[:, :-1].values
y=dataset.iloc[:, 1].values

from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size = 1/3, random_state = 0)


from sklearn.linear_model import LinearRegression
regressor=LinearRegression()
regressor.fit(x_train, y_train)

y_predict = regressor.predict(x_test)

mat.scatter(x_train, y_train, color='black')
mat.plot(x_train, regressor.predict(x_train), color='yellow')
mat.title('Salary vs Experience')
mat.xlabel('Experience')
mat.ylabel('Salary')
mat.show()

mat.scatter(x_test, y_test, color='green')
mat.plot(x_train, regressor.predict(x_train), color='yellow')
mat.title('Salary vs Experience')
mat.xlabel('Experience')
mat.ylabel('Salary')
mat.show()