#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Jun  7 04:05:55 2020"""

from keras.models import Sequential
from keras.layers import Conv2D
from keras.layers import MaxPool2D
from keras.layers import Flatten
from keras.layers import Dense

classifier = Sequential()

classifier.add(Conv2D(filters=32, kernel_size=3, input_shape=[64,64,3], activation='relu' ))
classifier.add(MaxPool2D(2,2))

classifier.add(Conv2D(filters=32, kernel_size=3, activation='relu' ))
classifier.add(MaxPool2D(2,2))

classifier.add(Flatten())

classifier.add(Dense(units=128, activation='relu'))
classifier.add(Dense(units=1, activation='sigmoid'))

classifier.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

from keras.preprocessing.image import ImageDataGenerator

train_datagen = ImageDataGenerator(
        rescale=1./255,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True)

test_datagen = ImageDataGenerator(rescale=1./255)

trainingSet = train_datagen.flow_from_directory(
        'dataset/train',
        target_size=(64, 64),
        batch_size=32,
        class_mode='binary')
testSet = test_datagen.flow_from_directory(
        'dataset/test',
        target_size=(64, 64),
        batch_size=32,
        class_mode='binary')

classifier.fit(
        trainingSet,
        steps_per_epoch=23002,
        epochs=25,
        validation_data=testSet,
        validation_steps=12501)