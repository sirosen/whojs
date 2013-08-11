/*
      ___           ___           ___         ___          ___
     /__/\         /__/\         /  /\       /  /\        /  /\
    _\_ \:\        \  \:\       /  /::\     /  /:/       /  /:/_
   /__/\ \:\        \__\:\     /  /:/\:\   /__/::\      /  /:/ /\
  _\_ \:\ \:\   ___ /  /::\   /  /:/  \:\  \__\/\:\    /  /:/ /::\
 /__/\ \:\ \:\ /__/\  /:/\:\ /__/:/ \__\:\    \  \:\  /__/:/ /:/\:\
 \  \:\ \:\/:/ \  \:\/:/__\/ \  \:\ /  /:/     \__\:\ \  \:\/:/~/:/
  \  \:\ \::/   \  \::/       \  \:\  /:/      /  /:/  \  \::/ /:/
   \  \:\/:/     \  \:\        \  \:\/:/      /__/:/    \__\/ /:/
    \  \::/       \  \:\        \  \::/       \__\/       /__/:/
     \__\/         \__\/         \__\/                    \__\/

    @author Dan Morgan, Jim Kogler, Neil Dahlke
    @version 0.0.1
*/

// TODO check that it is actually on screen.
// TODO add hover ability
// TODO convert to raw JS (no jQ dependency)
// TODO password input types
// TODO clear input
// TODO clear all inputs
// TODO make sure form value reads checkboxes and radios
// TODO remove jQuery dialog
// TODO Logger class

var Q = {
        LINK : "a",
        BUTTON : "button,input[type=button],input[type=submit]",

        // TODO: Clear input

        findLink : function(text) {
            return this.findElementWithText(Q.LINK, text, false);
        },

        findElements : function(data) {

            if (data.type && !data.query) {
                data.query = Q[data.type.toUpperCase()] || data.type;
            }

            var retVal = this.mergeFind(data);


            if (data.visible) {

                retVal = retVal.filter(":visible");
                if (retVal !== null) {
                    var qContext = this.context;
                    for(var i = 0; i < retVal.length; i++) {
                        var elNum = 0;
                        var $rV = $(retVal[i][0]);
                        $rV.parents().each(function() {
                            var $parent = $(this);
                            if (!$parent.is(':visible')) {
                                retVal.splice(elNum, elNum);
                                return;
                            }
                        });
                        elNum++;
                    }
                }
            }

            return retVal;
        },

        findElement : function(data) {
            var eles = this.findElements(data);
            if (eles.length == 1) {
                return eles[0];
            } else {
                data.error = "Too many elements found for query " + data.query;
                return null;
            }

        },

        findElementWithText : function(data) {
            var _elements = this.findElements(data);
            var _retVal = null;
            var _caseFunc = function(x) {return x;};
            if (!data.caseSensitive) _caseFunc = function(x) {return x.toLowerCase();};
            var _text = _caseFunc(data.text),
                _match = false,
                _partial = (!!data.findByPartial) ? data.findByPartial : false;

            _elements.each(function(i,v) {
                var _elText = _caseFunc($.trim($(v).text())) || _caseFunc($.trim($(v).val()));

                if (_partial) {
                    _match = (_elText.indexOf(_text) != -1);
                } else {
                    _match =  (_elText == _text);
                }

                if (_match) {
                    _retVal = $(v);
                }

            });

            return _retVal;
        },

        findFormInputByLabel : function(data) {

            var _caseFunc = function(x) { return x; },
                _inputField = null,
                _self;

            if (!data.label) return false;

            data.visible = true;
            data.type = 'label';

            if (!data.caseSensitive) _caseFunc = function(x) { return x.toLowerCase(); };

            var _labels = this.findElements(data),
                _text = _caseFunc(data.label);

            for(var i = 0; i < _labels.length; i++) {
                var $label = $(_labels[i]),
                    _labelText = _caseFunc($label.html()),
                    _match = false,
                    _partial = (!!data.findByPartial) ? data.findByPartial : false;

                if (_partial) {
                    _match = (_labelText.indexOf(_text) != -1);
                } else {
                    _match =  (_labelText == _text);
                }

                if (_match) {
                    _inputField = $('input[name="'+$label.attr('for')+'"]');
                    _inputField = _inputField.length === 0 ? $('input#'+$label.attr('for')+'') : _inputField;
                    _inputField = _inputField.length === 0 ? $('input.'+$label.attr('for')+'') : _inputField;
                    _inputField = _inputField.length === 0 ? $label.closest('input') : _inputField;
                }
            }

            return _inputField;
        },

        mergeFind : function(data) {
            var types = data.query.split(','),
                contextSelector = this.context.selector,
                qString = "",
                qResult = null;

            for(var i = 0; i < types.length; i++) {
                qString += contextSelector + ' ' + types[i];
                if (i != types.length - 1) {
                    // If this is added at the end it will
                    // bomb out the jQuery selector.
                    qString += ',';
                }
            }

            var qResult = $(qString);
            return qResult;
        }
    };

(function() {
    window.Who = window.Who || {

        setContext : function(context) {
            this.context = Q.context = $(context);
            // TODO: Since there is only one or two styles used, should we generate CSS here?
            // border: 5px solid #3399f3;
            // -webkit-transition : border 500ms ease-out;
            // -moz-transition : border 500ms ease-out;
            // -o-transition : border 500ms ease-out;
            $('*').removeClass('who-context');
            $(context).addClass('who-context');
        },

        resetContext : function() {
            this.setContext("body");
        },

        setContextToCurrentJQueryDialog : function(context) {
            var ele = null;
            var maxZ = 0;
            $(".ui-dialog:visible").each(function(i,v) {
                var z = $(v).css("z-index");
                if (z > maxZ) {
                    maxZ = z;
                    ele = v;
                }
            });
            this.setContext(ele);
        },

        seesElementWithText : function(data) {
            data.visible = true;
            var element = Q.findElementWithText(data);
            return (element && element.length == 1);
        },

        readsFormValue : function(data) {
            data.type = data.type || 'label';
            var element = Q.findFormInputByLabel(data);
            if (element && element.length) {
                return element.val();
            }
            return null;
        },

        typesValueIntoForm : function(data) {
            data.type = data.type || 'label';
            var $el = Q.findFormInputByLabel(data);

            if (!$el) {
                return false;
            }

            var str = data.input;
            var c = '';
            $el.val('');

            for(var i=0; i<str.length; i++) {
                c = str[i];
                $el.keydown();
                $el.val($el.val() + c);
                $el.keyup();
                $el.keypress();
            }
        },

        clicksElement : function(data) {

            var ele;
            if (!!data.text) {
                ele = Q.findElementWithText(data);
            } else if (!!data.label) {
                ele = Q.findFormInputByLabel(data);
            } else {
                ele = Q.findElement(data);
            }

            data.message = data.message || "ACTION - click @type@ with @text@";


            if (!!ele && ele.length > 0) {
                data.status = true;
                try {
                    var el = $(ele[0]);

                    if (el.click) {
                        el.click();
                        // TODO: This is some coolness! It'll show where the user clicked, but there is something
                        // going on with the closure I have to debug.
                        // $('#click_spot').remove();
                        // $('<div id="click_spot"/>').appendTo('body').css({left:event.x, top:event.y}).fadeOut();

                    } else {
                        data.status = false;
                        data.exception = "Click was not a function.";
                    }

                } catch(Exception) {
                    data.status = false;
                    data.exception = Exception;
                }
            } else {
                data.status = false;
                data.exception = data.query + " not found";
            }
            return data.status;
        },

        closeDialog : function(data) {
            data.query = Q.LINK + "," + Q.BUTTON;
            data.text("close");
            data.message = "ACTION - Close Dialog";
            return this.click(data);
        },

        passesTime : function(data) {
            var _ms = data.ms || 1000,
                _flag = false,
                _callback = data.thenWho || function(){ _flag = true; },
                _waitingFn = data.whileWaiting || function(){ return _flag; };

            setTimeout(_callback, _ms);
            return _waitingFn;
        },

        DEV : {

            findHiddenInputThroughInspection : function(data) {
                data.type = "input[type='hidden'][name='"+data.name+"']";
                var retVal = Query.findElement(data);
                return $(retVal);
            },

            clearAllInputs : function() {
                $('input[type=text]').val("");
            }

            // TODO: findByID
            // TODO: findByClassName

        }
    };

})();