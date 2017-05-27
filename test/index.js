var test = require('tape');
var viewConventions = require('ampersand-view-conventions');
var CheckboxView = require('../ampersand-checkbox-view');

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

    var view = new CheckboxView({name: 'checker', autoRender: true});
    t.strictEqual(view.value, false ,'should start out as false');
    t.equal(view.value, view.input.checked, 'value should be same as input value');
    t.strictEqual(view.disabled, false, 'disabled should be false by default');
    t.strictEqual(view.input.disabled, false, 'disabled should be false by default');

    view = new CheckboxView({name: 'checker', label: 'checker', parent: getParent(), autoRender: true});
    t.equal(view.labelEl.textContent, 'checker', 'should set label text');

    view.setValue(true);
    t.strictEqual(view.value, true, 'should be true now');
    t.strictEqual(view.value, view.input.checked, 'should be checked now');
    t.equal(counter, 2, 'parent update should have been called twice');

    view = new CheckboxView({name: 'checked', required: true, parent: getParent(), autoRender: true});
    t.strictEqual(view.el.children[2].style.display, 'none', 'should not show error right away');
    t.equal(counter, 1, 'parent update should have been called once (setValue called on init)');
    t.strictEqual(view.disabled, false, 'disabled should be false');
    t.strictEqual(view.input.disabled, false, 'disabled should be false');

    // check it directly
    view.setValue(true);

    t.equal(counter, 2, 'parent update should have been called twice');
    t.strictEqual(view.value, true, 'should be checked now');
    t.strictEqual(view.valid, true, 'should be valid now');

    view.setValue(false);

    t.equal(counter, 3, 'parent update should have been called thrice');
    t.strictEqual(view.value, false, 'should not be checked now');
    t.strictEqual(view.valid, false, 'should not be valid now');
    t.equal(view.el.children[2].style.display, 'block', 'error should be visible now');

    view = new CheckboxView({name: 'checked', required: true, parent: getParent(), value: true, autoRender: true});
    view.setValue(false);
    view.reset();
    t.equal(view.value, true, 'resets to original value');
    t.strictEqual(view.disabled, false, 'disabled should be false');
    t.strictEqual(view.input.disabled, false, 'disabled should be false');

    view.clear();
    t.equal(view.value, false, 'clears to false/unchecked');
    t.end();

    //test disabled
    view = new CheckboxView({
        name: 'checked',
        required: true,
        disabled: true,
        autoRender: true
    });

    t.strictEqual(view.disabled, true, 'disabled should be true');
    t.strictEqual(view.input.disabled, true, 'disabled should be true');
});
