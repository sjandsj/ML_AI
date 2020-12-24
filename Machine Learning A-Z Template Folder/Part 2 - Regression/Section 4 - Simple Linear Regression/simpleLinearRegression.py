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
x=dataset.iloc[:, 0].values
y=dataset.iloc[:, 1].values

from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size = 1/3, random_state = 0)
