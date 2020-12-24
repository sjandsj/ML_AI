#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue May 12 11:17:11 2020

@author: rails
"""


import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

dataset=pd.read_csv('Mall_Customers.csv')
x=dataset.iloc[:, 3:5].values

from sklearn.cluster import KMeans
wcss=[]
for i in range(1, 11):
    kmeans=KMeans(n_clusters=i, init='k-means++', random_state=0)
    kmeans.fit(x)
    wcss.append(kmeans.inertia_)
    
plt.plot(range(1, 11), wcss)
plt.title('Elbow Method')
plt.xlabel('Number of Clusters')
plt.ylabel('WCSS') 
plt.show()


kmeans=KMeans(n_clusters=5, init='k-means++', random_state=0)
y_means=kmeans.fit_predict(x)

plt.scatter(x[y_means==0, 0], x[y_means==0, 1], s=50, c='red', label = 'Standard')
plt.scatter(x[y_means==1, 0], x[y_means==1, 1], s=50, c='blue', label = 'Careless')
plt.scatter(x[y_means==2, 0], x[y_means==2, 1], s=50, c='green', label = 'Target')
plt.scatter(x[y_means==3, 0], x[y_means==3, 1], s=50, c='cyan', label = 'Sensible')
plt.scatter(x[y_means==4, 0], x[y_means==4, 1], s=50, c='magenta', label = 'Careful')
plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[: , 1], s=100, c='black', label = 'centroids')
plt.title('Clusters of Clients')
plt.xlabel('Annual Income')
plt.ylabel('Spending Score')
plt.show()
