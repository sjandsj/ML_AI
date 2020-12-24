#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Jun  9 08:19:10 2020

@author: rails
"""


import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

dataset=pd.read_csv('Social_Network_Ads.csv')
x=dataset.iloc[:, 2:4].values
y=dataset.iloc[:, 4].values

from sklearn.model_selection import train_test_split
xTrain, xTest, yTrain, yTest = train_test_split(x, y, test_size=0.25, random_state=0)

from sklearn.preprocessing import StandardScaler
sc=StandardScaler()
xTrain=sc.fit_transform(xTrain)
xTest=sc.transform(xTest)

from sklearn.svm import SVC
classifier=SVC(kernel= 'rbf', random_state=0)
classifier.fit(xTrain, yTrain)

yPredict=classifier.predict(xTest)

from sklearn.metrics import confusion_matrix
cm=confusion_matrix(yTest, yPredict)

from sklearn.model_selection import cross_val_score
accuracies=cross_val_score(estimator=classifier, X=xTrain, y=yTrain, cv=10)
accuracies.mean()
accuracies.std()

from sklearn.model_selection import GridSearchCV
params=[{'C': [1,10,100,1010], 'kernel': ['linear']},
        {'C': [1,10,100,1010], 'kernel': ['rbf'], 'gamma': [0.5, 0.6, 0.65, 0.75, 0.7,0.8]}
        ]
gridSearch=GridSearchCV(estimator=classifier,
                        param_grid=params,
                        scoring='accuracy',
                        cv=10, n_jobs=-1
                        )
gridSearch=gridSearch.fit(xTrain, yTrain)
bestAccuracy=gridSearch.best_score_
bestPArams=gridSearch.best_params_
