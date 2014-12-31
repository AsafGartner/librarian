from watchdog.events import PatternMatchingEventHandler

class DirectoryWatchHandler(PatternMatchingEventHandler):
    patterns = ["*.jpg", "*.jpeg"]

    def __init__(self, updater):
        super(DirectoryWatchHandler, self).__init__()
        self.updater = updater

    def on_any_event(self, event):
        print event.src_path, event.event_type
        self.updater.update()
