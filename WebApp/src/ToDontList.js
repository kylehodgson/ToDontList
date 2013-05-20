var ToDontList = function (initialList,saveService) {
    var self = this;
    
    self.items = ko.observableArray();

    self.title = ko.observable();
    self.description = ko.observable();
    self.complete = ko.observable();
    
    if (saveService instanceof Object && saveService.hasOwnProperty("save")) {
      self.saveService = saveService;  
    }
    
    if (initialList instanceof Array ) {
        initialList.forEach(function(item) {
            self.items.push(item);
        });
    }

    self.add_item = function () {
        self.items.push({ "title": self.title(), "description": self.description(), "complete": false });
    };

    self.delete_item = function(item) {
        self.items.remove(item);
    };

    self.save = function () {
        if (self.saveService instanceof Object) {
            self.saveService.save(JSON.stringify(self.items()));
            return;
        }
        console.log("No saveService provided.");
    };

    self.mark_complete = function(completeItem) {
        self.items().forEach(function (item) {
            if (item.title == completeItem.title) {
                console.log("Found match.");
                item.complete=true;
                return;
            }
        });
    };

};