# WhoJS Tutorial
_[WhoJS README](https://gist.github.com/neildahlke/e44d8c77562bdddb5a9d)_

## Contents

1. Getting Started
2. Using WhoJS
	- Setting Context
	- Reset Context
	- Typing Values Into a Form
	- Reading Values from a Form
	- Clicking Elements
	- Passing Time

## Getting Started
Grab yourself a copy of WhoJS from [GitHub](https://github.com/globusonline/whojs) and include it in your page similar to this:
```
<script src="javascripts/who.js"> </script>
```

#### Setting Context

Setting context is useful for zoning in on a specific part of the page Who is looking at. Running this example will show you very quickly a shift in Who's context. You can see what part of the page Who is actively looking at by finding the blue highlighted area.

```
Who.setContext('#new_context_example');
```
#### Reset Context
Sometimes you want Who to be watching over the whole page. A quick reset of context can be achieved using `resetContext()`. You'll notice when you run this code that the context is shifted back to the `body`.

```
Who.resetContext();
```

#### Typing Values Into a Form

When a `Who` user wants to type a value into a form, there are two things they need. The text of the `<label>` they are looking for, and the `input`, which is the text that will be put into the field.

```
Who.typesValueIntoForm({
    label : "Name",
    input : "Neil Dahlke"
});
```

The labels are case insensitive, and can also be search by partial matches using the `findByPartial` flag.
```
Who.typesValueIntoForm({
    label : "Tail",
    input : "Shark Fin",
    findByPartial : true
});
```

#### Clicking on elements
##### Clicking links

```
Who.setContext('#click_example');

Who.clicksElement({
	text : "Click Me!",
	type : "a"
});
```
or you can specify links using the `LINK` keyword.
```
Who.setContext('#click_example');

Who.clicksElement({
	text : "Click",
	type : "LINK",
	findByPartial : true
});
```
##### Clicking buttons
##### Clicking other elements

#### Reading form values
```
Who.typesValueIntoForm({
	label : "my name",
	input : "J Dilla",
	findByPartial : true
});

var formVal = Who.readsFormValue({
	label : "My NaMe Is:"
});

alert('Hi '+(formVal||"Who")+'!');
```


#### Seeing if elements are on screen


#### Passing time
When you need Who to chill for a moment, maybe while you're fetching some things with AJAX, you can use `passesTime` with the option `thenWho` as a required callback for when Who finishes waiting.

```
var _start = new Date();

Who.passesTime({
	ms : 2000,
	thenWho : function() {
		var _end = new Date(),
			_waited = ((_end - _start)/1000);
		alert("Who waited "+_waited+" seconds!");
	}
});
```



## Integration with Testing Frameworks

### Using Jasmine
### Using QUnit