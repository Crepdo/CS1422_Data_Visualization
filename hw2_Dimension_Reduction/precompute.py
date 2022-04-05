from importlib.resources import Package
from random import random
from sklearn import decomposition, manifold
import csv as csv
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler

color = ['yellow', 'black', 'aqua', 'green', 'teal', 'orange', 'navy', 'pink', 'pink', 'purple', 'red']

def show(v2, y):
    i = 0
    while i < len(v2):
        plt.scatter(v2[i][0], v2[i][1], color = color[y[i]])
        i = i + 10
    plt.show()

data = pd.read_csv('./train.csv')
image_vec = data.drop('label',axis=1)
labels = data['label'].astype(int)
convert_dict = {'label': int,
                'x': float,
                'y': float 
                }  
def pca_process(data, labels, dic):
    pca2 = decomposition.PCA(2)
    standardized_data = StandardScaler().fit_transform(data)
    processed_data = pca2.fit_transform(standardized_data)
    processed_data = np.vstack((labels, processed_data.T)).T
    df = pd.DataFrame(processed_data, columns=["label", "x", "y"]).astype(dic)
    print(df.to_csv('./pca.csv', index=False))
    print("Finished pca")
    
def mds_process(data, labels, dic):
    mds2 = manifold.MDS(2, n_jobs=-1)
    i = 0
    n = 2000
    batched_data = data[i:i+n]
    i = i + n
    processed_data = mds2.fit_transform(batched_data)

    while i < len(labels):
        batched_data = data[i:i+n]
        i = i + n
        processed_batched_data = mds2.fit_transform(batched_data)
        print(i, processed_data.shape)
        processed_data = np.vstack((processed_data, processed_batched_data))
    # show(processed_data, labels)
        
    processed_data = np.vstack((labels, processed_data.T)).T
    df = pd.DataFrame(processed_data, columns=["label", "x", "y"]).astype(dic)
    print(df.to_csv('./mds.csv', index=False))
    print("Finished mds")

def t_sne_process(data, labels, dic):
    pca2 = decomposition.PCA(50)
    standardized_data = StandardScaler().fit_transform(data)
    pca_processed_data = pca2.fit_transform(standardized_data)
    print('pca process done')
    t_sne2 = manifold.TSNE(2, learning_rate='auto', n_jobs=-1)
    processed_data = t_sne2.fit_transform(pca_processed_data)
    processed_data = np.vstack((labels, processed_data.T)).T
    df = pd.DataFrame(processed_data, columns=["label", "x", "y"]).astype(dic)
    print(df.to_csv('./tsne.csv', index=False))
    print("Finished sne")

# tsne = pd.read_csv('./mds.csv')
# print(tsne.shape)
# image_vec = tsne.drop('label',axis=1)
# print(image_vec.shape)
# show(image_vec.to_numpy(), labels)
pca_process  (image_vec, labels, convert_dict)
mds_process(image_vec, labels, convert_dict)
t_sne_process(image_vec, labels, convert_dict)