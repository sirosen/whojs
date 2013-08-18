# WhoJS API

- _Change `text` to `valueText`, `label` to `valueLabel`._
- _`Logger` class?_
- _Convert to RAW JS?_
- _Make sure there is no conflict with jQuery._
- _add a findClosest method._

One should think of `Who` as a user who has no idea what an id, class, or DOM element is. It is the average user, incapable of opening the console to track down the buttons they would like. `Who` is simple, and can only perform difficult tasks the same way as any other simple person, by pointing, clicking, and typing their way to victory.
#Who

### clearsInput
##### Params
```
options : {
	label : STRING,
	query : TODO,
	caseSensitive : BOOL [default:false],
	findByPartial : BOOL [default:false]
}
```
This method allows Who to clear an input field based on the `label` option, which will match the text inside the label for that input. By default, the function requires a `label` to be an exact match. Overriding `findByPartial` allows for a partial match.

### clicksButton
##### Params
```
options : {
	text : STRING,
	caseSensitive : BOOL [default:false],
	findByPartial : BOOL [default:false]
}
```
This method will simulate a click on any button type (`button`, `input[type=button]`, `input[type=submit]`) that contains text matching the `text` parameter. The usual `findByPartial` rules apply.

### clicksElement
##### Params
```
options : {
	text : STRING,
	type : STRING,
	query : STRING,
	label : STRING,
	caseSensitive : BOOL [default:false],
	findByPartial : BOOL [default:false]
}
```
This method will simulate a click on an element on the page, based on a small set of `options`. If a user specifies `text` and `type`, then `clicksElement` will search the DOM for an element of that `type` containing the `text` specified. If the user specifies the `label`, then `clicksElement` will look for the input `for` that label. This is useful for triggering events on `focus` or on `blur`. Finally, when the above methods are not enough, it is possible to specify a `query` parameter, that is entered in the same syntax as jQuery (`#` for IDs, `.` for class names, etc). With the `query` parameter specified, you can click any element on the page, at the cost of Who clarity.

### clicksLink
##### Params
```
options : {
	text : STRING,
	caseSensitive : BOOL [default:false],
	findByPartial : BOOL [default:false]
}
```
`clicksLink` is a wrapper around the `clicksElement` function that allows someone to more concisely click on a link by simply passing the text of the link they would like to click.

### hoversOver
To be implemented...

### passesTime
##### Params
```
options : {
	ms : STRING,
	thenWho : function () {},
	whileWaiting : function() {}
}
```
This method is extremely useful for simulating a period of time in which `Who` is not actively moving about the page, but may be scanning it, or reading other information. For example, if `Who` has clicked a link and is waiting for an AJAX response. To set the amount of time Who should wait, simply set `ms` as the number of milliseconds you would like `Who` to wait. By default, this method will continuously return `false` while Who is waiting, and once Who is no longer waiting, the method returns `true`. However, these methods are both overridable. To alter what happens when Who is waiting, override the method `whileWaiting`, and to override the successfully finished waiting method, use `thenWho`.

### readsFormValue
##### Params
```
options : {
	label : STRING,
	caseSensitive : BOOL [default:false],
	findByPartial : BOOL [default:false]
}
```
TODO: Add query to readsFormValue

This method allows for `Who` to read from any value field in a form, be it a `checkbox`, `radio`, `input`, or `textarea`. To retrieve this form value, one must simply pass a `label` option with the inner text of the label `for` that input.


### resetContext
##### Params
```
None
```
Resets the DOM context of Who, to the default DOM element: `body`.

### setContext
##### Params
```
context - STRING
```
Sets the location in the DOM where Who will be active. The parameter `context` is a query string (i.e `#new-container` or `.other-new-guy`).

### seesElement
To be implemented...

### seesElementWithText
##### Params
```
options : {
	text : STRING,
	type : STRING,
	visible : BOOL [default:false],
	caseSensitive : BOOL [default:false],
	findByPartial : BOOL [default:false]
}
```
This method gives `Who` the ability to quickly locate an element on screen with a given string as it's contents. By setting the `type` of the element, we determine what type of element we are looking for. The `text` option, is the option that must match the inner text of the element we are looking for. By default, this method looks for elements that are currently `visible` on screen, however, flipping the option to `false`, will allow Who to find hidden elements.

### typesValueIntoForm
##### Params
```
options : {
	label : STRING,
	text : STRING,
	caseSensitive : BOOL [default:false],
	findByPartial : BOOL [default:false]
}
```
TODO: Add query to typesValueIntoForm

This method simulates a keystroke-by-keystroke entering of information into a form field. To find the correct input, use the `label` parameter, which matches the inner text of the label for that field, and is mapped by the `label`'s `for` attribute.  `findByPartial` rules apply. The `text` option refers to the text that Who will actually be typing in.


---

#Who.DEV
Some tasks that one would like to test during BDD are unable to be done by the average user. That is to say, not all users can open
### findHiddenInputThroughInspection

### findByElID

### findByElClass

### clearAllInputs

---

## Q
WhoJS makes extensive use of an internal library, Q which manages all of the DOM querying that needs to be handled by Who.

### findEl
### findEls
### findElWithText
### findValueByLabel
### mergeFind

```
unused_options : {
	message : STRING,
	status : STRING,
	exception : STRING,
	visible : STRING,
	numImages : STRING,
	valueType : STRING,
	optionText : STRING,
	name : STRING,
	id : STRING
}
```