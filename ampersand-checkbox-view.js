var domify = require('domify');
var dom = require('ampersand-dom');


// can be overwritten by anything with:
// <input>, <label> and <the same `role` attributes
var template = [
    '<label class="checkbox">',
        '<input type="checkbox"><span role="label"></span>',
        '<div role="message-container" class="message message-below message-error">',
            '<p role="message-text"></p>',
        '</div>',
    '</label>'
].join('');


function CheckboxView(opts) {
    if (!opts.name) throw new Error('must pass in a name');

    // settings
    this.name = opts.name;
    this.value = opts.value || '';
    this.el = opts.el;
    this.template = opts.template || template;
    this.label = opts.label || opts.name;
    this.required = (typeof opts.required === 'boolean') ? opts.required : false;
    this.validClass = opts.validClass || 'input-valid';
    this.invalidClass = opts.invalidClass || 'input-invalid';
    this.requiredMessage = opts.requiredMessage || 'This box must be checked.';
    this.parent = opts.parent;

    // render right away
    this.render();

    // bind event handlers
    this.handleInputEvent = this.handleInputEvent.bind(this);

    // add our event handlers
    this.input.addEventListener('change', this.handleInputEvent, false);

    if (opts.value) this.setValue(true);

    if (this.isValid()) {
        this.hasBeenValid = true;
    }
    // always start true with checkboxes
    this.valid = true;
}

// remove and destroy element
CheckboxView.prototype.remove = function () {
    this.input.removeEventListener('change', this.handleInputEvent, false);
    var parent = this.el.parentNode;
    if (parent) parent.removeChild(this.el);
};

// very `manual` render to avoid dependencies
CheckboxView.prototype.render = function () {
    // only allow this to be called once
    if (this.rendered) return;
    var newDom = domify(this.template);
    var parent = this.el && this.el.parentNode;
    if (parent) parent.replaceChild(newDom, this.el);
    this.el = newDom;
    this.input = this.el.querySelector('input');
    this.labelEl = this.el.querySelector('[role=label]');
    this.messageContainer = this.el.querySelector('[role=message-container]');
    this.messageEl = this.el.querySelector('[role=message-text]');
    this.setMessage(this.message);
    if (this.required) this.input.required = true;
    this.input.value = !!this.value;
    this.labelEl.textContent = this.label;
    this.rendered = true;
};

// handle input events and show appropriate errors
CheckboxView.prototype.handleInputEvent = function () {
    // track whether user has edited directly
    if (document.activeElement === this.input) this.directlyEdited = true;
    this.value = this.input.checked;
    if (this.message || this.hasBeenValid) {
        this.valid = this.runTests();
    }
    if (this.parent) this.parent.update(this);
};

// set the error message if exists
// hides the message container entirely otherwise
CheckboxView.prototype.setMessage = function (message) {
    var input = this.input;
    this.message = message;
    // there is an error
    if (message && this.hasBeenValid) {
        this.messageContainer.style.display = 'block';
        this.messageEl.textContent = message;
        dom.addClass(input, this.invalidClass);
        dom.removeClass(input, this.validClass);
    } else {
        this.messageContainer.style.display = 'none';
        if (this.hasBeenValid && this.editedDirectly) {
            dom.addClass(input, this.validClass);
            dom.removeClass(input, this.invalidClass);
        }
    }
};

CheckboxView.prototype.setValue = function (value) {
    this.input.checked = !!value;
    this.handleInputEvent();
};

CheckboxView.prototype.beforeSubmit = function () {
    this.hasBeenValid = true;
    this.valid = this.runTests();
    this.handleInputEvent();
};

CheckboxView.prototype.isValid = function () {
    return !!(!this.required || this.input.checked);
};

// runs tests and sets first failure as message
CheckboxView.prototype.runTests = function () {
    var valid = this.isValid();
    if (valid) {
        this.hasBeenValid = true;
    }
    this.setMessage(valid ? '' : this.requiredMessage);
    return valid;
};


module.exports = CheckboxView;
