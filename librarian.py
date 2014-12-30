import cherrypy
import os

from os import listdir
from os.path import isfile, join, basename, splitext


class Librarian(object):
    @cherrypy.expose
    def index(self):
        return {'msg': 'Librarian'}

class LibrarianImagesService(object):
    exposed = True

    @cherrypy.tools.json_out()
    def GET(self):
        path = 'static/images'

        return [
            {
                'key': splitext(basename(f))[0],
                'image_path': join(path, f)
            } for f in listdir(path) if isfile(join(path, f))
        ]


if __name__ == '__main__':

    from jinja2 import Environment, FileSystemLoader
    from jinja2plugin import Jinja2TemplatePlugin

    env = Environment(loader=FileSystemLoader('.'))

    Jinja2TemplatePlugin(cherrypy.engine, env=env).subscribe()

    # Register the Jinja2 tool
    from jinja2tool import Jinja2Tool
    cherrypy.tools.template = Jinja2Tool()

    conf = {
        '/': {
            'tools.sessions.on': True,
            'tools.staticdir.root': os.path.abspath(os.getcwd()),
            'tools.template.on': True,
            'tools.template.template': './static/index.html',
            'tools.encode.on': False
        },
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': 'static'
        },
        '/images': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on': True
        }
    }
    librarian = Librarian()
    librarian.images = LibrarianImagesService()
    cherrypy.quickstart(librarian, '/', conf)
