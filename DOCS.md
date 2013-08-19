##### WhoJS v0.0.1

---

# WhoJS Docs

One should think of `Who` as a web user with no clue what the "DOM" is. It is the average user, incapable of opening the console to track down the buttons they would like. `Who` is simple, and can only perform difficult tasks the same way as any other simple person, by pointing, clicking, and typing their way to victory.

#### Before getting started, a word on finding elements
##### findByPartial and caseSensitive
When `Who` utilizes a method that scans for text on the page, he will always have two options: `findByPartial` and `caseSensitive`. Both of these options default to `false`, and can always be overridden. Using `findByPartial` means that any text you are trying to match, be it a `label` or `placeholderText`, does not have to be an exact match. That means searching for "WIZARD" with the option `findByPartial` set to `true` would match a string such as "A wizard is never late, Frodo Baggins". This works because `caseSensitive` defaults to `false` as well, however, simply setting `caseSensitive` to `true` would cause the example to fail.

##### text, label and placeholderText
When searching for an element on page, the `text` option refers to the inner text of the element `Who` is looking for. This is useful when looking for elements such as `<div>`s, `<li>`s, `<span>`s, etc.

Another common element of text searching with `Who` is will be `label` and `placeholderText`. When `Who` searches by `label`, the approach is to look for a label on screen with inner text matching the `label` option. Once `Who` has located that label, the input that label is `for` is returned.

Inputs don't always have labels however, and in that case, `Who` has a backup. Using `placeholderText` will allow Who to track down any input that has a placeholder string that matches the `placeholderText` option.

_Also, feel free to checkout the [demo site](http://globusonline.github.io/whojs/)._

---

### clearsInput
##### Params
```
options = {
	label : STRING,
	placeholderText : STRING,
	caseSensitive : BOOL [default:false],
	findByPartial : BOOL [default:false]
}
```
This method allows `Who` to clear out any text in an input field or textarea.

### clicksButton
##### Params
```
options = {
	text : STRING [required],
	caseSensitive : BOOL [default:false],
	findByPartial : BOOL [default:false]
}
```
This method will simulate a click on any button type (`<button>`, `<input[type=button]>`, `<input[type=submit]>`) on a matching element.

### clicksCheckbox
##### Params
```
options = {
	label : STRING [required],
	caseSensitive : BOOL [default:false],
	findByPartial : BOOL [default:false]
}
```
This method provides a shortcut for clicking on a `<input[type="checkbox']>` element that matches the `label` option.

### clicksElement
##### Params
```
options = {
	text : STRING,
	type : STRING,
	query : STRING,
	label : STRING,
	placeholderText : STRING,
	caseSensitive : BOOL [default:false],
	findByPartial : BOOL [default:false]
}
```
This method will simulate a click on an element on the page, based on a small set of `options`. If a user specifies `text` and `type`, then `clicksElement` will search the DOM for an element of that `type` containing the `text` specified. If the user specifies the `label`, then `clicksElement` will look for the input `for` that label. This is useful for triggering events on `focus` or on `blur`. Finally, when the above methods are not enough, it is possible to specify a `query` parameter, that is entered in the same syntax as jQuery (`#` for IDs, `.` for class names, etc). With the `query` parameter specified, you can click any element on the page, at the cost of Who clarity.

### clicksLink
##### Params
```
options = {
	text : STRING [required],
	caseSensitive : BOOL [default:false],
	findByPartial : BOOL [default:false]
}
```
`clicksLink` is a wrapper around the `clicksElement` function that allows someone to more concisely click on an `<a>`nchor by simply passing the text of the link they would like to click.

### clicksRadio
##### Params
```
options = {
	label : STRING [required],
	caseSensitive : BOOL [default:false],
	findByPartial : BOOL [default:false]
}
```
This method allows `Who` to click on radio button with a label inner text matching the `label` option.

### hoversOver
##### Params
```
options = {
	text : STRING,
	type : STRING,
	query : STRING,
	label : STRING,
	caseSensitive : BOOL [default:false],
	findByPartial : BOOL [default:false]
}
```
`hoversOver` is a method that allows `Who` to hover over any element on the page and trigger it's `mouseover` events.

### passesTime
##### Params
```
options = {
	ms : STRING [required],
	thenWho : FUNCTION,
	whileWaiting : FUNCTION
}
```
This method is extremely useful for simulating a period of time in which `Who` is not actively moving about the page, but may be scanning it, or reading other information. For example, if `Who` has clicked a link and is waiting for an AJAX response. To set the amount of time Who should wait, simply set `ms` as the number of milliseconds you would like `Who` to wait. By default, this method will continuously return `false` while Who is waiting, and once Who is no longer waiting, the method returns `true`. However, these methods are both overridable. To alter what happens when Who is waiting, override the method `whileWaiting`, and to override the successfully finished waiting method, use `thenWho`.

### readsFormValue
##### Params
```
options = {
	label : STRING,
	placeholderText : STRING,
	caseSensitive : BOOL [default:false],
	findByPartial : BOOL [default:false]
}
```



This method allows for `Who` to read from any value field in a form, be it a `checkbox`, `radio`, `input`, or `textarea`. To retrieve this form value, one must simply pass a `label` option with the inner text of the label `for` that input.


### resetContext
##### Params
```
None
```
Resets the DOM context of Who, to the default DOM element: `body`.

### seesElement
##### Params
```
options = {
    text : STRING,
    type : STRING,
    query : STRING,
    label : STRING,
    placeholderText : STRING,
    caseSensitive : BOOL [default:false],
    findByPartial : BOOL [default:false]
}
```
`seesElement` allows `Who` to report `true` if a certain element is visible on screen, and `false` if not.

### seesElWithPlaceholderText
##### Params
```
options = {
	placeholderText : STRING,
	visible : BOOL [default:false],
	caseSensitive : BOOL [default:false],
	findByPartial : BOOL [default:false]
}
```
`seesElWithPlaceholderText` allows `Who` to report `true` if an input with matching `placeholderText` is found on screen, and `false` if not.

### seesElementWithText
##### Params
```
options = {
	text : STRING,
	type : STRING,
	visible : BOOL [default:false],
	caseSensitive : BOOL [default:false],
	findByPartial : BOOL [default:false]
}
```
This method gives `Who` the ability to quickly locate an element on screen with a given string as it's contents. By setting the `type` of the element, we determine what type of element we are looking for. The `text` option, is the option that must match the inner text of the element we are looking for. By default, this method looks for elements that are currently `visible` on screen, however, flipping the option to `false`, will allow Who to find hidden elements.

### seesImages
##### Params
```
None
```
`seesImage` allows `Who` to report `true` if an image is visible in context on screen, and `false` if not.

### selectsFromDropdown
```
options = {
	label : STRING,
	optionText : STRING,
	caseSensitive : BOOL [default:false],
	findByPartial : BOOL [default:false]
}
```
`selectsFromDropdown` allows `Who` to select an `<option>` from a `<select>` box on screen. `Who` uses the input that matches the `label` option, and matches the the `<option>` by

### setContext
##### Params
```
context = STRING
```
Sets the location in the DOM where Who will be active. The parameter `context` is a query string (i.e `#new-container` or `.other-new-guy`).


### typesValueIntoForm
##### Params
```
options = {
	label : STRING,
	text : STRING,
	caseSensitive : BOOL [default:false],
	findByPartial : BOOL [default:false]
}
```

This method simulates a keystroke-by-keystroke entering of information into a form field. To find the correct input, use the `label` parameter, which matches the inner text of the label for that field, and is mapped by the `label`'s `for` attribute.  `findByPartial` rules apply. The `text` option refers to the text that Who will actually be typing in.

### typesEnterKey
```
options = {
	label : STRING,
	placeholderText : STRING,
	caseSensitive : BOOL [default:false],
	findByPartial : BOOL [default:false]
}
```
`typesEnterKey` gives `Who` the ability to recreate an enter key stroke with the focus on the matching `<input>`.