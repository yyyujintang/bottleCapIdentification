from tornado import ioloop
from tornado import web
from json import loads

class CapIdentificationHandler(web.RequestHandler):
    def initialize(self, imgModel):
        self.imgModel = imgModel

    def post(self):
        args = loads(self.request.body.decode("utf-8"))

        self.imgModel.setImg(args["image"])
        identifiedImg = self.imgModel.getImg()

        self.write("{success: true,")
        self.write("{image:" + identifiedImg)

class Localserver:
    #image model
    imgModel = None

    def __init__(self, imgModel):
        self.imgModel = imgModel

    def run(self):
        print("The local server is running in", 8000, "port")
        app = web.Application([
            (r"/cap_identification", CapIdentificationHandler, {"IOT_model": self.imgModel}),  # 注册路由
        ])
        app.listen(8000)
        ioloop.IOLoop.current().start()


    
