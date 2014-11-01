/*$AMPERSAND_VERSION*/
var domify = require('domify');
var dom = require('ampersand-dom');


// can be overwritten by anything with:
// <input>, <label> and the same `data-hook` attributes
var template = [
    '<label class="checkbox">',
        '<input type="checkbox"><span data-hook="label"></span>',
        '<div data-hook="message-container" class="message message-below message-error">',
            '<p data-hook="message-text"></p>',
        '</div>',
    '</label>'
].join('');


function CheckboxView(opts) {
    if (!opts || !opts.name) throw new Error('must pass in a name');

    // settings
    this.name = opts.name;
    this.value = (opts.value === true) || false;
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

    this.test();
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
    this.labelEl = this.el.querySelector('[data-hook~=label]');
    this.messageContainer = this.el.querySelector('[data-hook~=message-container]');
    this.messageEl = this.el.querySelector('[data-hook~=message-text]');
    this.setMessage(this.message);
    this.input.checked = !!this.value;
    this.input.name = this.name;
    this.labelEl.textContent = this.label;
    this.rendered = true;
};

// handle input events and show appropriate errors
CheckboxView.prototype.handleInputEvent = function () {
    // track whether user has edited directly
    if (document.activeElement === this.input) this.directlyEdited = true;
    this.value = this.input.checked;
    this.test();
    if (this.parent) this.parent.update(this);
};

// set the error message if exists
// hides the message container entirely otherwise
CheckboxView.prototype.setMessage = function (message) {
    var input = this.input;
    this.message = message;
    // there is an error
    if (message && this.shouldValidate) {
        this.messageContainer.style.display = 'block';
        this.messageEl.textContent = message;
        dom.addClass(input, this.invalidClass);
        dom.removeClass(input, this.validClass);
    } else {
        this.messageContainer.style.display = 'none';
        if (this.shouldValidate && this.editedDirectly) {
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
    this.shouldValidate = true;
    this.handleInputEvent();
};

CheckboxView.prototype.test = function () {
    var valid = !this.required || this.value;
    if (valid) this.shouldValidate = true;
    this.valid = valid;
    if (this.shouldValidate && !valid) {
        this.setMessage(this.requiredMessage);
    } else {
        this.setMessage('');
    }
    return valid;
};


module.exports = CheckboxView;
