import cherrypy

class Raw(object):
    @cherrypy.expose
    def index(self):
        return {'msg': 'Librarian'}

