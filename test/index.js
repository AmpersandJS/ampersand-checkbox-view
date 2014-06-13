var test = require('tape');
var viewConventions = require('ampersand-view-conventions');
var CheckboxView = require('../ampersand-checkbox-view');

// silly phantomjs doesn't have this
if (!Function.prototype.bind) Function.prototype.bind = require('function-bind');


viewConventions.view(test, CheckboxView, {name: 'hi'});
viewConventions.formField(test, CheckboxView, {name: 'hi'}, true);


test('basics', function (t) {
    var counter;
    function getParent() {
        counter = 0;
        return {
            update: function () {
                counter++;
            }
        };
    }

    var view = new CheckboxView({name: 'checker'});
    t.strictEqual(view.value, false ,'should start out as false');
    t.equal(view.value, view.input.checked, 'value should be same as input value');

    view = new CheckboxView({name: 'checker', label: 'checker', parent: getParent()});
    t.equal(view.labelEl.textContent, 'checker', 'should set label text');

    view.setValue(true);
    t.strictEqual(view.value, true, 'should be true now');
    t.strictEqual(view.value, view.input.checked, 'should be checked now');
    t.equal(counter, 1, 'parent update should have been called once');

    view = new CheckboxView({name: 'checked', required: true, parent: getParent()});
    t.strictEqual(view.el.children[2].style.display, 'none', 'should not show error right away');

    // check it directly
    view.setValue(true);

    t.equal(counter, 1, 'parent update should have been called once');
    t.strictEqual(view.value, true, 'should be checked now');
    t.strictEqual(view.valid, true, 'should be valid now');

    view.setValue(false);

    t.equal(counter, 2, 'parent update should have been called twice');
    t.strictEqual(view.value, false, 'should not be checked now');
    t.strictEqual(view.valid, false, 'should not be valid now');
    t.equal(view.el.children[2].style.display, 'block', 'error should be visible now');

    t.end();
});
