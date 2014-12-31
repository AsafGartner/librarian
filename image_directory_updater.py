
from os import listdir
from os.path import isfile, join, basename, splitext


class ImageDirectoryUpdater(object):
    def __init__(self, image_path):
        self.image_path = image_path
        self.images = []

        self.update()
        self.update_available = False

    def update(self):
        self.update_available = True
        self.images = [
            join(self.image_path, f) for f in listdir(self.image_path) if isfile(join(self.image_path, f))
        ]

    def is_update_available(self):
        return self.update_available

    def get_update(self):
        self.update_available = False
        return self.images