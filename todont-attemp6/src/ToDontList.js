var ToDontList = function (initialList) {
    var self = this;
    
    self.items = ko.observableArray();

    self.title = ko.observable();
    self.description = ko.observable();
    
    
    if (initialList instanceof Array ) {
        initialList.forEach(function(item) {
            self.items.push(item);
        });
    }

    self.add_item = function () {
        self.items.push({ "title": self.title(), "description": self.description() });
    };
    
};