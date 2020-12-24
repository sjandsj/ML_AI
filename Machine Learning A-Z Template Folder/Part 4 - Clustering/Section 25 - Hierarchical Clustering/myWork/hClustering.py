#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri May 15 11:10:47 2020

@author: rails
"""


import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

dataset=pd.read_csv('Mall_Customers.csv')
x=dataset.iloc[:, 3:5].values

import scipy.cluster.hierarchy as HC
dendrogram=HC.dendrogram(HC.linkage(x, method='ward'))
plt.title('Dendrogram')
plt.xlabel('Customers')
plt.ylabel('Euclidien distance')
plt.show()

from sklearn.cluster import AgglomerativeClustering
agCluster=AgglomerativeClustering(n_clusters=5, affinity='euclidean', linkage='ward')
hc_result=agCluster.fit_predict(x)

plt.scatter(x[hc_result==0, 0], x[hc_result==0, 1], s=50, color='red')
plt.scatter(x[hc_result==1, 0], x[hc_result==1, 1], s=50, color='blue')
plt.scatter(x[hc_result==2, 0], x[hc_result==2, 1], s=50, color='green')
plt.scatter(x[hc_result==3, 0], x[hc_result==3, 1], s=50, color='cyan')
plt.scatter(x[hc_result==4, 0], x[hc_result==4, 1], s=50, color='magenta')
plt.title('Herarical clustering')
plt.xlabel('Annual Income')
plt.ylabel('Spending score')
plt.show()

