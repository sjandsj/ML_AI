#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import numpy as np
import pandas as pd
import matplotlib.pyplot as mat


dataset=pd.read_csv('Churn_Modelling.csv')
x=dataset.iloc[:,3: 13].values
y=dataset.iloc[:, 13].values

from sklearn.preprocessing import LabelEncoder
genderEncoder=LabelEncoder()
x[:, 2]=genderEncoder.fit_transform(x[:,2])

from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
countryTransformer=ColumnTransformer([('encoder', OneHotEncoder(), [1])], remainder='passthrough')
x=np.array(countryTransformer.fit_transform(x), dtype=np.str)
x=x[:, 1:]

from sklearn.model_selection import train_test_split
xTrain, xTest, yTrain, yTest = train_test_split(x, y, test_size = 0.2, random_state = 0)

from sklearn.preprocessing import StandardScaler
sc=StandardScaler()
xTrain=sc.fit_transform(xTrain)
xTest=sc.transform(xTest)

import keras
from keras.models import Sequential
from keras.layers import Dense

classifier=Sequential()

classifier.add(Dense(output_dim=6, input_dim=11, activation='relu', init= 'uniform'))
classifier.add(Dense(output_dim=6, activation='relu', init= 'uniform'))
classifier.add(Dense(output_dim=1, activation='sigmoid', init= 'uniform'))

classifier.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])


classifier.fit(xTrain, yTrain, batch_size=10, epochs=100)

yPredict=(classifier.predict(xTest)).round()


from sklearn.metrics import confusion_matrix
cm=confusion_matrix(yTest, yPredict)
