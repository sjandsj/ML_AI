#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Jun 21 03:53:11 2020

@author: rails
"""
""" 

import numpy as np
import random
import os
import torch
import torch.nn as nn
import torch.nn.functional as Functions
import torch.optim as optim
import torch.autograd as autograd
from torch.autograd import Variable

class Network(nn.Module):
    
    def __init__(self, inputSize, nbAction):
        super(Network, self).__init__()
        #super().__init__()
        self.inputSize=inputSize
        self.nbAction=nbAction
        self.fc1=nn.Linear(inputSize, 30)
        self.fc2=nn.Linear(30, nbAction)
   

    def forward(self, state):
        x=Functions.relu(self.fc1(state))
        qValues=self.fc2(x)
        return qValues
    
class ExperienceReplay():
    
    def __init__(self, capacity):
        self.capacity=capacity
        self.memory=[]
    
    def push(self, event):
        self.memory.append(event)
        if len(self.memory) > self.capacity:
            del self.memory[0]
            
    def sample(self, batchSize):
        samples = zip(*random.sample(self.memory, batchSize))
        return map(lambda x: Variable(torch.cat(x, 0)), samples)
    
class Dqn():

    def __init__(self, inputSize, nbAction, gamma):
        self.gamma=gamma
        self.rewardWindow=[]
        self.model=Network(inputSize, nbAction)
        self.memory=ExperienceReplay(100000)
        self.optimizer=optim.Adam(self.model.parameters(), lr=0.001)
        self.lastState=torch.Tensor(inputSize).unsqueeze(0)
        self.lastReward=0
        self.lastAction=0
        
    def selectAction(self,state):
        probs=Functions.softmax(self.model(Variable(state, volatile=True))*100)
        action=probs.multinomial(num_samples=1)
        return action.data[0,0]

    def learn(self, batchState, batchNextState, batchReward, batchActon):
        modelObject= self.model(batchState)
        print('===this is batch state', batchState)
        print('===this is model object', modelObject)
        outputssemi =modelObject.gather(1, batchActon.unsqueeze(1))
        outputs=outputssemi
        nextOutputs=self.model(batchNextState).detach().max(1)[0]
        target=batchReward+self.gamma*nextOutputs
        temporialLoss=Functions.smooth_l1_loss(outputs, target)
        self.optimizer.zero_grad()
        temporialLoss.backward(retain_variables=True)
        self.optimizer.step()

    def update(self, reward, newSignal):
        newState=torch.Tensor(newSignal).float().unsqueeze(0) 
        self.memory.push((self.lastState, newState, torch.LongTensor([int(self.lastAction)]), torch.Tensor([self.lastReward])))
        action=self.selectAction(newState)
        if len(self.memory.memory) > 100:
            batchState, batchNextState, batchReward, batchActon=self.memory.sample(100)
            self.learn(batchState, batchNextState, batchReward, batchActon)
        self.lastAction=action
        self.lastState=newState
        self.reward=reward
        self.rewardWindow.append(reward)
        if len(self.rewardWindow) > 1000:
            del self.rewardWindow[0]
        return action
    
    def score(self):
        return sum(self.rewardWindow)/(len(self.rewardWindow) +1.)
    
    def save(self):
        torch.save({
            'stateDict': self.model.state_dict(),
            'optimizer': self.optimizer.state_dict,
            }, 'savedBrain.pth')
    
    def load(self):
        if os.path.isfile('savedBrain.pth'):
            print('Saving File..........')
            loading=torch.load('savedBrain.pth')
            self.model.load_state_dict(loading['stateDict'])
            self.optimizer.load_state_dict(loading['optimizer'])
        else:
            print('No Brain was Saved')



"""

# AI for Self Driving Car

# Importing the libraries

import numpy as np
import random
import os
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
import torch.autograd as autograd
from torch.autograd import Variable

# Creating the architecture of the Neural Network

class Network(nn.Module):
    
    def __init__(self, input_size, nb_action):
        super(Network, self).__init__()
        self.input_size = input_size
        self.nb_action = nb_action
        self.fc1 = nn.Linear(input_size, 30)
        self.fc2 = nn.Linear(30, nb_action)
    
    def forward(self, state):
        x = F.relu(self.fc1(state))
        q_values = self.fc2(x)
        return q_values

# Implementing Experience Replay

class ReplayMemory(object):
    
    def __init__(self, capacity):
        self.capacity = capacity
        self.memory = []
    
    def push(self, event):
        self.memory.append(event)
        if len(self.memory) > self.capacity:
            del self.memory[0]
    
    def sample(self, batch_size):
        samples = zip(*random.sample(self.memory, batch_size))
        return map(lambda x: Variable(torch.cat(x, 0)), samples)

# Implementing Deep Q Learning

class Dqn():
    
    def __init__(self, input_size, nb_action, gamma):
        self.gamma = gamma
        self.reward_window = []
        self.model = Network(input_size, nb_action)
        self.memory = ReplayMemory(100000)
        self.optimizer = optim.Adam(self.model.parameters(), lr = 0.001)
        self.last_state = torch.Tensor(input_size).unsqueeze(0)
        self.last_action = 0
        self.last_reward = 0
    
    def select_action(self, state):
        probs = F.softmax(self.model(Variable(state, volatile = True))*100) # T=100
        action = probs.multinomial(num_samples=1, replacement=True)
        return action.data[0,0]
    
    def learn(self, batch_state, batch_next_state, batch_reward, batch_action):
        outputs = self.model(batch_state).gather(1, batch_action.unsqueeze(1)).squeeze(1)
        next_outputs = self.model(batch_next_state).detach().max(1)[0]
        target = self.gamma*next_outputs + batch_reward
        td_loss = F.smooth_l1_loss(outputs, target)
        self.optimizer.zero_grad()
        td_loss.backward()
        self.optimizer.step()
    
    def update(self, reward, new_signal):
        new_state = torch.Tensor(new_signal).float().unsqueeze(0)
        self.memory.push((self.last_state, new_state, torch.LongTensor([int(self.last_action)]), torch.Tensor([self.last_reward])))
        action = self.select_action(new_state)
        if len(self.memory.memory) > 100:
            batch_state, batch_next_state, batch_action, batch_reward = self.memory.sample(100)
            self.learn(batch_state, batch_next_state, batch_reward, batch_action)
        self.last_action = action
        self.last_state = new_state
        self.last_reward = reward
        self.reward_window.append(reward)
        if len(self.reward_window) > 1000:
            del self.reward_window[0]
        return action
    
    def score(self):
        return sum(self.reward_window)/(len(self.reward_window)+1.)
    
    def save(self):
        torch.save({'state_dict': self.model.state_dict(),
                    'optimizer' : self.optimizer.state_dict(),
                   }, 'last_brain.pth')
    
    def load(self):
        if os.path.isfile('last_brain.pth'):
            print("=> loading AI ")
            checkpoint = torch.load('last_brain.pth')
            self.model.load_state_dict(checkpoint['state_dict'])
            self.optimizer.load_state_dict(checkpoint['optimizer'])
            print("Loaded !")
        else:
            print("no saved brain found")







    