var mock_save_service = new function () {
    var self = this;
    self.saved = false;
    self.persisted = "";

    self.save = function (data) {
        self.saved = true;
        self.persisted = data;
    };
};