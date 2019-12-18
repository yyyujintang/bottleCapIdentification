# -*- coding: utf-8 -*-
import tkinter as tk
import numpy as np
import math

from copy import deepcopy
from PIL import Image, ImageTk
from tkinter import filedialog

from ImgModel import ImgModel

class GUI(tk.Frame):
    #model
    imgModel = None

    inputImagePath = ""

    imageWidth = 480
    imageHeight = 270
    
    def __init__(self, master, imgModel):
        super().__init__(master, width=1000, height=1000)
        self.imgModel = imgModel
        self.pack()

        #选择图片路径
        self.selectInputImagePathButtonText = tk.StringVar()
        self.selectInputImagePathButtonText.set("请选择图片路径")
        self.selectInputImagePathButton = tk.Button(self, textvariable=self.selectInputImagePathButtonText, command=self.__selectIamge)
        self.selectInputImagePathButton.grid(row = 0, column = 0, padx = 10, pady = 10)

        self.selectInputImagePathEntryText = tk.StringVar()
        self.selectInputImagePathEntryText.set("")
        self.selectInputImagePathEntry = tk.Entry(self, textvariable=self.selectInputImagePathEntryText, width = 30)
        self.selectInputImagePathEntry.grid(row = 0, column = 1, columnspan = 2, padx = 10, pady = 10)

        #处理函数选择
        self.functionButtonList = []
        self.functionButtonNameList = ["获取结果"]
        self.functionButtonCommandList = [self.__getResult]
        for i in range(len(self.functionButtonNameList)):
            self.functionButtonList.append(tk.Button(self, text=self.functionButtonNameList[i],  command=self.functionButtonCommandList[i]).grid(row = 2, column = 2 * i + 1, sticky="W"))
            
        #参数输入框
        self.argsNameList = []
        self.argsValue = {
        }
        self.argsLabelList = []
        self.argsEntryList = []
        for i in range(len(self.argsNameList)):
            temp = tk.StringVar()
            temp.set(self.argsNameList[i])
            self.argsLabelList.append(tk.Label(self, textvariable = temp).grid(row = 1 , column = 2 * i, padx = 2, sticky="W"))
            temp = tk.StringVar()
            temp.set(self.argsValue[self.argsNameList[i]])
            self.argsValue[self.argsNameList[i]] = temp
            self.argsEntryList.append(tk.Entry(self, textvariable = temp, width = 3).grid(row = 1, column = 2 * i + 1, sticky="W"))

        #显示图片
        self.selectInputImagePathLabelText = tk.StringVar()
        self.selectInputImagePathLabelText.set("输入图片")
        self.selectInputImagePathLabel = tk.Label(self, textvariable=self.selectInputImagePathLabelText)
        self.selectInputImagePathLabel.grid(row = 5, column = 0)

        self.pilInputImage = Image.fromarray(np.zeros((self.imageHeight, self.imageWidth))).convert("L")
        self.tkInputImage = ImageTk.PhotoImage(image=self.pilInputImage)
        self.inputImageLabel = tk.Label(self, image=self.tkInputImage)
        self.inputImageLabel.grid(row = 6, column = 0, columnspan = 6)

        self.selectOutputImagePathLabelText = tk.StringVar()
        self.selectOutputImagePathLabelText.set("处理后图片")
        self.selectOutputImagePathLabel = tk.Label(self, textvariable=self.selectOutputImagePathLabelText)
        self.selectOutputImagePathLabel.grid(row = 5, column = 6)

        self.pilOutputImage = Image.fromarray(np.zeros((self.imageHeight, self.imageWidth))).convert("L")
        self.tkOutputImage = ImageTk.PhotoImage(image=self.pilOutputImage)
        self.outputImageLabel = tk.Label(self, image=self.tkOutputImage)
        self.outputImageLabel.grid(row = 6, column = 6, columnspan = 6)

        

    #事件函数
    def __selectIamge(self):
        filePath = filedialog.askopenfilename()
        if(filePath != ""):
            self.inputImagePath = filePath
            self.selectInputImagePathEntryText.set(filePath)

            self.pilInputImage = Image.open(self.inputImagePath).convert("L")
            self.pilInputImage = self.__resize(self.pilInputImage, self.imageWidth, self.imageHeight)
            self.imgModel.setPilImage(self.pilInputImage)
            self.tkInputImage = ImageTk.PhotoImage(image=self.pilInputImage)
            self.inputImageLabel = tk.Label(self, image=self.tkInputImage)
            self.inputImageLabel.grid(row = 6, column = 0, columnspan = 6)
            

            self.pilOutputImage = Image.fromarray(np.zeros((self.imageHeight, self.imageWidth))).convert("L")
            self.tkOutputImage = ImageTk.PhotoImage(image=self.pilOutputImage)
            self.outputImageLabel = tk.Label(self, image=self.tkOutputImage)
            self.outputImageLabel.grid(row = 6, column = 6, columnspan = 6)
        else:
            self.pilOutputImage = Image.fromarray(np.zeros((self.imageHeight, self.imageWidth))).convert("L")
            self.tkOutputImage = ImageTk.PhotoImage(image=self.pilOutputImage)
            self.outputImageLabel = tk.Label(self, image=self.tkOutputImage)
            self.outputImageLabel.grid(row = 6, column = 6, columnspan = 6)
        
        return filePath

    def __getResult(self):
        self.imgModel.identify()
        self.tkOutputImage = ImageTk.PhotoImage(image=imgModel.getPilImage())
        self.outputImageLabel = tk.Label(self, image=self.tkOutputImage)
        self.outputImageLabel.grid(row = 6, column = 6, columnspan = 6)
        return 

    def __resize(self, pilImage, width, height):
        widthRate = pilImage.size[0] / width
        heightRate = pilImage.size[1] / height
        rate = max(widthRate, heightRate)
        pilImage = pilImage.resize((int(pilImage.size[0] / rate), int(pilImage.size[1] / rate)))

        return pilImage


if __name__ == "__main__":
    root = tk.Tk()
    root.title("test")
    imgModel = ImgModel()
    app = GUI(root, imgModel)
    app.mainloop()



