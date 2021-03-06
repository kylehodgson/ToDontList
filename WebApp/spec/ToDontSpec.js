﻿describe("To Don't List", function() {
    
    var test_items = [
        { "title": "Thing not to do.", "description": "Please do not do this thing.","complete": false },
        { "title": "Another thing not to do.", "description": "Please do not do this other thing.","complete": false }];
    var test_item1 = test_items[0];
    var test_item2 = test_items[1];

    it("should be able to add new items", function() {
        var target = new ToDontList();
        
        target.title(test_item2.title);
        target.description(test_item2.description);
        target.add_item();

        expect(target.items()[0]).toEqual(test_item2);
    });

    it("should be able to instantiate with pre-existing items", function() {
        var target = new ToDontList(test_items);

        expect(target.items().length).toBe(2);
        expect(target.items()[0].title).toBe(test_item1.title);
        expect(target.items()[1].description).toBe(test_item2.description);
    });

    it("should be able to delete items", function() {
        var target = new ToDontList(test_items);
        
        target.delete_item(test_item1);

        expect(target.items().length).toBe(1);
    });

    it("should be able to persist items via a service", function () {

        var target = new ToDontList(test_items, mock_save_service);
        target.save();
        
        expect(mock_save_service.saved).toEqual(true);

        var rehydrated = JSON.parse(mock_save_service.persisted);
        expect(rehydrated[0]).toEqual(test_item1);
        expect(rehydrated[1]).toEqual(test_item2);
    });

    it("should not crash when saving but not provided with a save service", function() {
        var target = new ToDontList(test_items);
        target.save();
    });

    it("should allow us to mark an item completed", function() {
        var target = new ToDontList(test_items);
        target.mark_complete(test_item2);
        expect(target.items()[1].complete).toBe(true);
    });

    it("should allow us to unmark an item completed", function() {
        var target = new ToDontList(test_items);
        target.mark_complete(test_item1);
        expect(target.items()[0].complete).toBe(true);
        target.mark_complete(test_item1);
        expect(target.items()[0].complete).toBe(false);
    });

});
