#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun May 10 11:10:06 2020

@author: rails
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

dataset=pd.read_csv('Social_Network_Ads.csv')
x=dataset.iloc[:, 2:4].values
y=dataset.iloc[:, 4].values

from sklearn.model_selection import train_test_split
xTrain, xTest, yTrain, yTest=train_test_split(x, y, test_size=0.25, random_state= 0)

from sklearn.preprocessing import StandardScaler
sc=StandardScaler()
xTrain=sc.fit_transform(xTrain)
xTest=sc.transform(xTest)

from sklearn.naive_bayes import GaussianNB
classifier=GaussianNB()
classifier.fit(xTrain, yTrain)

yPredict=classifier.predict(xTest)

from sklearn.metrics import confusion_matrix
cm=confusion_matrix(yTest, yPredict)

from matplotlib.colors import ListedColormap
X_set, y_set = xTrain, yTrain
X1, X2 = np.meshgrid(np.arange(start = X_set[:, 0].min() - 1, stop = X_set[:, 0].max() + 1, step = 0.001),
                     np.arange(start = X_set[:, 1].min() - 1, stop = X_set[:, 1].max() + 1, step = 0.001))
plt.contourf(X1, X2, classifier.predict(np.array([X1.ravel(), X2.ravel()]).T).reshape(X1.shape),
             alpha = 0.75, cmap = ListedColormap(('red', 'green')))
plt.xlim(X1.min(), X1.max())
plt.ylim(X2.min(), X2.max())
for i, j in enumerate(np.unique(y_set)):
    plt.scatter(X_set[y_set == j, 0], X_set[y_set == j, 1],
                c = ListedColormap(('blue', 'black'))(i), label = j)
plt.title('NaiveBayes (Training set)')
plt.xlabel('Age')
plt.ylabel('Estimated Salary')
plt.legend()
plt.show()


from matplotlib.colors import ListedColormap
X_set, y_set = xTest, yTest
X1, X2 = np.meshgrid(np.arange(start = X_set[:, 0].min() - 1, stop = X_set[:, 0].max() + 1, step = 0.001),
                     np.arange(start = X_set[:, 1].min() - 1, stop = X_set[:, 1].max() + 1, step = 0.001))
plt.contourf(X1, X2, classifier.predict(np.array([X1.ravel(), X2.ravel()]).T).reshape(X1.shape),
             alpha = 0.75, cmap = ListedColormap(('red', 'green')))
plt.xlim(X1.min(), X1.max())
plt.ylim(X2.min(), X2.max())
for i, j in enumerate(np.unique(y_set)):
    plt.scatter(X_set[y_set == j, 0], X_set[y_set == j, 1],
                c = ListedColormap(('blue', 'black'))(i), label = j)
plt.title('NaiveBayes (Test set)')
plt.xlabel('Age')
plt.ylabel('Estimated Salary')
plt.legend()