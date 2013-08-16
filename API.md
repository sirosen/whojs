# WhoJS API

WhoJS makes extensive use of an internal library, `Q` which manages all of the DOM querying that needs to be handled by Who.

### clearsInput
##### Params
```
options : {
	label : STRING,
	query : TODO,
	findByPartial : BOOL [default:false]
}
```
This method allows Who to clear an input field based on the `label` option, which will match the text inside the label for that input. By default, the function requires a `label` to be an exact match. Overriding `findByPartial` allows for a partial match.

### clicksButton
##### Params
```
options : {
	text : STRING,
	findByPartial : BOOL
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
	findByPartial : BOOL
}
```
This method will simulate a click on an element on the page, based on a small set of `options`.

### clicksLink
##### Params
```
options : {
	text : STRING,
	findByPartial : BOOL
}
```
`clicksLink` is a wrapper around the `clicksElement` function that allows someone to more concisely click on a link by simply passing the text of the link they would like to click.

### hoversOver
##### Params
```
options : {

}
```
This method remains unimplemented.

### setContext
##### Params
```
context - STRING
```
Sets the location in the DOM where Who will be active. The parameter `context` is a query string (i.e '#new-container' or '.other-new-guy').

### resetContext
##### Params
```
None
```
Resets the DOM context of Who, to the default: body.

### seesElementWithText
##### Params
```
options : {
	text : STRING,
	type : STRING,
	findByPartial : BOOL
}
```
This function will look for an element on screen that is currently visible to the user.

### readsFormValue
##### Params
```
options : {
	label : STRING,
	findByPartial : BOOL
}
```
TODO: Add query to readsFormValue

### typesValueIntoForm
##### Params
```
options : {
	label : STRING,
	text : STRING,
	findByPartial : BOOL
}
```
TODO: Add query to typesValueIntoForm
This method simulates a keystroke-by-keystroke entering of information into a form field. To find the correct input, use the `label` parameter, which matches the inner text of the label for that field, and is mapped by the `label`'s `for` attribute.  `findByPartial` rules apply. The `text` option refers to the text that Who will actually be typing in.

### passesTime
##### Params
```
options : {
	ms : STRING,
	thenWho : function () {},
	whileWaiting : function() {}
}
```


---

#Who.DEV API
### findHiddenInputThroughInspection
All items found by this function must be hidden inputs.

### findByElID

### findByElClass

### clearAllInputs

---

## Q - DOM Querying for WhoJS
### findEl
### findEls
### findElWithText
### findValueByLabel
### mergeFind

```
options : {
	text : STRING,
	label : STRING,
	message : STRING,
	status : STRING,
	exception : STRING,
	ms : STRING,
	thenWho : STRING,
	whileWaiting : STRING,
	visible : STRING,
	numImages : STRING,
	valueType : STRING,
	optionText : STRING,
	name : STRING,
	id : STRING
}
```