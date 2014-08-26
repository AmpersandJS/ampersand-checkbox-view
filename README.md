# ampersand-checkbox-view

A view module for intelligently rendering and validating checkbox input. Works well with [ampersand-form-view](ampersandjs/ampersand-form-view).

It does the following:

- Automatically shows/hides error message based required.
- Will only show error message checkbox is required and:
    - trying to submit form and it's not checked.
    - it has ever been checked and now isn't.

Depdent on two micro-libs, so works well with ampersand apps, backbone apps or anything else, really.


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
    // type value to use for the input tag's type value
    type: 'text',
    // class to set on input when input is valid
    invalidClass: 'input-invalid', // <- that's the default
    // Message to use if error is that it's required
    // but no value was set.
    requiredMessage: 'This box must be checked.',
    // optional, you can pass in the parent view explicitly
    parent:  someViewInstance 
});

// append it somewhere or use it in side an ampersand-form-view
document.querySelector('form').appendChild(field.el);

```

## browser support 

[![testling badge](https://ci.testling.com/AmpersandJS/ampersand-checkbox-view.png)](https://ci.testling.com/AmpersandJS/ampersand-checkbox-view)

## credits

Created by [@HenrikJoreteg](http://twitter.com/henrikjoreteg).

## license

MIT

