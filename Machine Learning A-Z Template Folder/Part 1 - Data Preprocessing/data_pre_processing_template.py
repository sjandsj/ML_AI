# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as mat

dataset = pd.read_csv('Data.csv')
x = dataset.iloc[:, :-1].values
y = dataset.iloc[:, 3].values

from sklearn.impute import SimpleImputer 
imputer = SimpleImputer(missing_values=np.nan, strategy="mean")
imputer = imputer.fit(x[:, 1:3])
x[:, 1:3] = imputer.transform(x[:, 1:3])

from sklearn.preprocessing import LabelEncoder
labelEncoder_x = LabelEncoder()
x[:, 0] = labelEncoder_x.fit_transform(x[:, 0])

labelEncoder_y = LabelEncoder()
y = labelEncoder_y.fit_transform(y)

from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
columnTransformer = ColumnTransformer([('encoder', OneHotEncoder(), [0])],remainder='passthrough')
x=np.array(columnTransformer.fit_transform(x),dtype=np.str)

from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size = 0.2, random_state = 0)

from sklearn.preprocessing import StandardScaler
standardScaler_x = StandardScaler()
x_train = standardScaler_x.fit_transform(x_train)
x_test = standardScaler_x.transform(x_test)
