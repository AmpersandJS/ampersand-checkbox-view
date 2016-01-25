# ampersand-checkbox-view

Lead Maintainer: [Michael Garvin](https://github.com/wraithgar)

# overview

A view module for intelligently rendering and validating checkbox input. Works well with [ampersand-form-view](ampersandjs/ampersand-form-view).

[ampersand-checkbox-view](#ampersand-checkbox-view) extends [ampersand-view](ampersandjs/ampersand-view), so you may further `.extend({...})` it to your desire.

It does the following:

- Automatically shows/hides error message based on if the field is [`required`](#example).
- Will only show error message checkbox is required and:
    - trying to submit form and it's not checked.
    - it has ever been checked and now isn't.

<!-- starthide -->
Part of the [Ampersand.js toolkit](http://ampersandjs.com) for building clientside applications.
<!-- endhide -->

## install

```
npm install ampersand-checkbox-view
```

## example

```javascript
var CheckboxView = require('ampersand-checkbox-view');

var field = new CheckboxView({
    // form input `name`
    name: 'client_name',
    // You can replace the built-in template with your own.
    // just give it an html string. Make sure it has a single "root" element that contains:
    //  - an `<input>` element
    //  - an element with a `data-hook="label"` attribute
    //  - an element with a `data-hook="message-container"` attribute (this we'll show/hide)
    //  - an elememt with a `data-hook="message-text"` attribute (where message text goes for error)
    template: // some HTML string
    // Label name
    label: 'App Name',
    // optinal intial value if it has one
    value: true, // or false
    // optional, this is the element that will be
    // replaced by this view. If you don't
    // give it one, it will create one.
    el: document.getElementByID('field'),
    // whether or not this field is required
    required: true, // true by default
    // class to set on input when input is valid
    validClass: 'input-valid', // <- that's the default
    // class to set on input when input is valid
    invalidClass: 'input-invalid', // <- that's the default
    // Message to use if error is that it's required
    // but no value was set.
    requiredMessage: 'This box must be checked.',
    // optional, you can pass in the parent view explicitly
    parent:  someViewInstance,
    // optional, called before form's submitCallback function called
    beforeSubmit: function() { console.log('ampersand-checkbox-view rocks!'); }
});

// append it somewhere or use it in side an ampersand-form-view
document.querySelector('form').appendChild(field.el);

```

## api
### properties
Commonly accessed properties listed below.  See the `initialize()` function for additional properties available.

- `valid` (boolean)
- `value` (boolean)
- `startingValue` (boolean) - this is coerced from any initail `value` provided during construction

### functions
- `new CheckboxView()` - constructor
    - see the [example](#example) for constructor options
- `clear()`
    - sugar for `view.setValue(false);`
- `reset()`
    - sugar for `view.setValue(this.startingValue);`
- `setValue([boolean])`
    - sets the value of the view. the view will **always** maintain a value of type `boolean`.

## changelog

- 4.1.0
    - Remove `domify` and using ampersand-view `renderWithTemplate`
- 4.0.0
    - Bump to ampersand-view 8.x
- 3.0.0
    - Extend ampersand-view.  Add support `autoRender`, `clear`, `reset`

## credits

Created by [@HenrikJoreteg](http://twitter.com/henrikjoreteg).

## license

MIT

