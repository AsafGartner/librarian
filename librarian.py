import cherrypy
import os


class Librarian(object):
    @cherrypy.expose
    def index(self):
        return {'msg': 'Librarian'}


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
            'tools.staticdir.dir': './static'
        }
    }
    cherrypy.quickstart(Librarian(), '/', conf)