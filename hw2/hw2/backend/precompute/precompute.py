import csv as csv
import matplotlib.pyplot as plt
import numpy as np
import pandas
import sklearn

#sklearn not auto
from sklearn import decomposition, manifold
# data 
data = pandas.read_csv('./trainnig_data.csv')
labels = data['label'].astype(int)

def pca(data, labels, grid):
    pca_out = decomposition.PCA(2)
    std_data = sklearn.preprocessing.StandardScaler().fit_transform(data)
    out_data = pca_out.fit_transform(std_data)
    # frame out
    framed_data = pandas.DataFrame(np.vstack((labels, out_data.T)).T, columns=["label", "x", "y"]).astype(grid)
    print(framed_data.to_csv('./pca.csv', index=False))
    
def mds(data, labels, grid):
    mds_out = manifold.MDS(2, n_jobs=-1)
    processed = mds_out.fit_transform(data)
    # frame out
    framed_data = pandas.DataFrame(np.vstack((labels, processed.T)).T, columns=["label", "x", "y"]).astype(grid)
    print(framed_data.to_csv('./mds.csv', index=False))

def t_SNE(data, labels, grid):
    # pre PCA
    pca_out = decomposition.PCA(50)
    std_data = sklearn.StandardScaler().fit_transform(data)
    pca_processed = pca_out.fit_transform(std_data)
    # t-SNE
    t_sne_out = manifold.TSNE(2, learning_rate='auto', n_jobs=-1)
    processed = t_sne_out.fit_transform(pca_processed)
    # frame out
    framed_data = pandas.DataFrame(np.vstack((labels, processed.T)).T, columns=["label", "x", "y"]).astype(grid)
    print(framed_data.to_csv('./tsne.csv', index=False))

# call
img_vector = data.drop('label',axis=1)
grid = {'label': int, 'x': float, 'y': float }
pca  (img_vector, labels, grid)
mds (img_vector, labels, grid)
t_SNE (img_vector, labels, grid)