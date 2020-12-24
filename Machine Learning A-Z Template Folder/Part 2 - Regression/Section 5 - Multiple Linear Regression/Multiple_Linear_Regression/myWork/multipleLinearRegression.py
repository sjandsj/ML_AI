#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Apr 22 05:04:35 2020

@author: rails
`"""

import numpy as np 
import pandas as pd
import matplotlib.pyplot as mat

dataset = pd.read_csv('50_Startups.csv')
x=dataset.iloc[:, :-1].values
y=dataset.iloc[:, 4].values

from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
columnTransformer = ColumnTransformer([('encoder', OneHotEncoder(), [3])], remainder='passthrough')
x=np.array(columnTransformer.fit_transform(x), dtype='float64')

x=x[:, 1:]

from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state = 0)

from sklearn.linear_model import LinearRegression
regressor=LinearRegression()
regressor.fit(x_train, y_train)

y_predict = regressor.predict(x_test)

import statsmodels.api as sm
x=np.append(np.ones((50,1)), values=x, axis=1)

x_opt=x[:, [0, 1, 2, 3, 4, 5]]
regressor_ols=sm.OLS(y, x_opt).fit()
regressor_ols.summary()

x_opt=x[:,[ 0, 1, 3, 4, 5]]
regressor_ols=sm.OLS(y, x_opt).fit()
regressor_ols.summary()

x_opt=x[:, [0,3,4,5]]
regressor_ols=sm.OLS(y, x_opt).fit()
regressor_ols.summary()

x_opt=x[:, [0,3,5]]
regressor_ols=sm.OLS(y, x_opt).fit()
regressor_ols.summary()

x_opt=x[:, [0,3]]
regressor_ols=sm.OLS(y, x_opt).fit()
regressor_ols.summary()



