import cherrypy
import os
import json

from os.path import splitext
from os.path import basename


class Librarian(object):
    @cherrypy.expose
    def index(self):
        return {'msg': 'Librarian'}


from image_directory_updater import ImageDirectoryUpdater

image_path = 'static/images'
updater = ImageDirectoryUpdater(image_path)


class LibrarianImagesService(object):
    exposed = True

    def GET(self):
        cherrypy.response.headers["Content-Type"] = "text/event-stream"
        if updater.is_update_available():
            images = updater.get_update()

            images = [
                {
                    'key': splitext(basename(f))[0],
                    'image_path': f
                } for f in images
            ]

            return "event: update\n" + "data: " + json.dumps(images) + "\n\n"
        else:
            return "\n"
    GET._cp_config = {'response.stream': True, 'tools.encode.encoding': 'utf-8'}


class LibrarianDocumentsService(object):
    exposed = True

    @cherrypy.tools.json_out()
    def GET(self):
        return [
            {
                'name': "Document %s" % (i + 1)
            } for i in range(3)
        ]


class LibrarianFoldersService(object):
    exposed = True

    @cherrypy.tools.json_out()
    def GET(self):
        return [
            {
                'name': "Folder %s" % (i + 1)
            } for i in range(3)
        ]

if __name__ == '__main__':

    from jinja2 import Environment, FileSystemLoader
    from jinja2plugin import Jinja2TemplatePlugin

    env = Environment(loader=FileSystemLoader('.'))

    Jinja2TemplatePlugin(cherrypy.engine, env=env).subscribe()

    # Register the Jinja2 tool
    from jinja2tool import Jinja2Tool
    cherrypy.tools.template = Jinja2Tool()

    method_dispatcher_conf = {
        'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
        'tools.response_headers.on': True
    }

    from watchdog.observers import Observer
    from directory_watch_handler import DirectoryWatchHandler

    observer = Observer()
    observer.schedule(DirectoryWatchHandler(updater), image_path)
    observer.start()

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
        '/images': method_dispatcher_conf,
        '/documents': method_dispatcher_conf,
        '/folders': method_dispatcher_conf
    }
    librarian = Librarian()
    librarian.images = LibrarianImagesService()
    librarian.documents = LibrarianDocumentsService()
    librarian.folders = LibrarianFoldersService()
    cherrypy.quickstart(librarian, '/', conf)
