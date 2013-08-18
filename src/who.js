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

var Q = {
        LINK : "a",
        BUTTON : "button,input[type=button],input[type=submit]",
        INPUT : "input,textarea,select",

        // _caseFunc : function(x) {
        //     x = x || "";
        //     return x.toLowerCase();
        // },

        // TODO Dismiss alert box, fill in alert input.


        findEl : function(data) {
            var els = this.findEls(data);
            if (els.length == 1) {
                return els[0];
            } else {
                console.log('Too many elements found for ' + data.query);
                return null;
            }
        },

        findEls : function(data) {

            if (data.type && !data.query) {
                data.query = Q[data.type.toUpperCase()] || data.type;
            }

            var retVal = this.mergeFind(data);

            if (data.visible) {
                retVal = retVal.filter(":visible");
                if (retVal !== null) {
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

        findElWithText : function(data) {
            var _elements = this.findEls(data);
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

        findValueByLabel : function(data) {
            var _caseFunc = function(x) { return x; },
                _$matchingField = null,
                _self = this,
                _valueType = data.valueType || 'input';

            data.visible = true;
            data.type = 'label';

            if (!data.label) {
                return false;
            }

            if (!data.caseSensitive) {
                _caseFunc = function(x) {
                    return x.toLowerCase();
                };
            }

            var _labels = this.findEls(data),
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

                    _$matchingField = $(_valueType+'[name="'+$label.attr('for')+'"]') ||
                                     $(_valueType+'#'+$label.attr('for')) ||
                                     $(_valueType+'.'+$label.attr('for'));
                }
            }

            return _$matchingField;
        },

        findValueByPlaceholderText : function(data) {

            var _caseFunc = function(x) { return x; },
                _$matchingField = null,
                _self = this,
                _valueType = data.valueType || 'input',
                _inputs = null,
                _placeholderText = null;

            if (!data.placeholderText) {
                return false;
            }

            if (!data.caseSensitive) {
                _caseFunc = function(x) {
                    x = x || "";
                    return x.toLowerCase();
                };
            }

            data.visible = true;
            data.type = 'INPUT';

            _inputs = this.findEls(data);
            _placeholderText = _caseFunc(data.placeholderText);

            for(var i = 0; i < _inputs.length; i++) {
                var $input = $(_inputs[i]),
                    _inputPlaceholder = _caseFunc($input.attr('placeholder')),
                    _match = false,
                    _partial = (!!data.findByPartial) ? data.findByPartial : false;

                if (_partial) {
                    _match = (_inputPlaceholder.indexOf(_placeholderText) != -1);
                } else {
                    _match =  (_inputPlaceholder == _placeholderText);
                }

                if (_match) {
                    _$matchingField = $input;
                }
            }

            return _$matchingField;
        },

        mergeFind : function(data) {
            var _query = data.query || "",
                _types = _query.split(','),
                _contextSelector = this.context.selector,
                _qString = "",
                _qResult = null;

            for(var i = 0; i < _types.length; i++) {
                _qString += _contextSelector + ' ' + _types[i];
                if (i != _types.length - 1) {
                    // If this is added at the end it will
                    // bomb out the jQuery selector.
                    _qString += ',';
                }
            }

            _qResult = $(_qString);
            return _qResult;
        }
    };

(function() {
    window.Who = window.Who || {

        clearsInput : function(data) {
            // TODO: How does this react with checkboxes/radios/selects?
            var _el = Q.findValueByLabel(data);

            if (_el && _el.length == 1) {
                _el.val("");
            } else {
                console.log("Incorrect number of inputs returned.");
            }
        },

        clicksButton : function(data) {
            data.type = "BUTTON";
            this.clicksElement(data);
        },

        clicksElement : function(data) {

            // TODO: determine how I want to handle elements that have no text and only have icons.

            var ele;
            if (!!data.text) {
                ele = Q.findElWithText(data);
            } else if (!!data.label) {
                ele = Q.findValueByLabel(data);
            } else if (!!data.placeholderText) {
                ele = Q.findValueByPlaceholderText(data);
            } else {
                ele = Q.findEl(data);
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
                        $('#click_spot').remove();
                        $('<div id="click_spot"/>').appendTo('body')
                            .css({
                                left : event.x,
                                top : event.y,
                                height : '50px',
                                width : '50px',
                                'border-radius' : '50%'
                            })
                           .fadeOut();
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

        clicksLink : function(data) {
            data.type = "LINK";
            this.clicksElement(data);
        },


        hoversOver : function(data) {
            // TODO: Implement this method.
        },

        passesTime : function(data) {
            var _ms = data.ms || 1000,
                _flag = false,
                _callback = data.thenWho || function(){ _flag = true; },
                _waitingFn = data.whileWaiting || function(){ return _flag; };

            setTimeout(_callback, _ms);
            return _waitingFn;
        },

        readsFormValue : function(data) {
            var element = Q.findValueByLabel(data);

            if (element && element.length) {
                return element.val();
            }
            return null;
        },

        resetContext : function() {
            this.setContext("body");
        },

        seesElWithPlaceholderText : function(data) {
            var $el = $(Q.findValueByPlaceholderText(data));
            return ($el && ($el.length == 1));
        },

        seesElementWithText : function(data) {
            data.visible = true;
            var element = Q.findElWithText(data);
            return (element && element.length == 1);
        },

        seesImages : function(data) {
            data = data || {};
            data.type = "img";
            data.numImages = data.numImages || 1;
            data.visible = true;
            var $el = $(Q.findEl(data));

            // TODO: add option withAltTag

            // var _isVisible = false;
            // $el.load(function(){
            //         alert('Good image!');
            //         _isVisible = true;
            //         return true;
            //     })
            //     .error(function(){
            //         alert('Bad image!');
            //         return false;
            //     });

            return ($el && $el.length == data.numImages);
        },

        clicksRadioButton : function(data) {
            // TODO: implement this method
        },

        clicksCheckbox : function(data) {
            // TODO: implement this method
        },

        selectsFromDropDown : function(data) {

            data.valueType = 'select';
            var _optionText = data.optionText || "",
                _$selectBoxes = Q.findValueByLabel(data),
                _box = _$selectBoxes[0],
                _match = false;

            for (var i = 0; i < _box.length || _match; i++) {
                var _optLabel = _box[i].label;
                if (_optionText === _optLabel) {
                    $(_box).val(_box[i].value);
                }
            }

            // TODO: Error messaging if select box or option were not found.
        },

        // TODO seesXElements

        setContext : function(context) {
            this.context = Q.context = $(context);
            $('*').removeClass('who-context');
            $(context).addClass('who-context');
        },

        typesValueIntoForm : function(data) {
            data.type = data.type || 'label';

            var $el;

            if (!!data.label) {
                $el = Q.findValueByLabel(data);
            } else if (!!data.placeholderText) {
                $el = Q.findValueByPlaceholderText(data);
            } else {
                $el = Q.findEl(data);
            }

            if (!$el) {
                return false;
            }

            var str = data.text;
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

        typesEnterKey : function(data) {

            var $el;

            if (!!data.label) {
                $el = Q.findValueByLabel(data);
            } else if (!!data.placeholderText) {
                $el = Q.findValueByPlaceholderText(data);
            } else {
                $el = Q.findEl(data);
            }

            if (!$el) {
                return false;
            }

            // var e = jQuery.Event("keypress");
            // e.which = 13;
            // e.keyCode = 13;
            // $el.trigger(e);
            $el.parents('form').submit();
        },

        DEV : {

            findHiddenInputThroughInspection : function(data) {
                data.type = "input[type='hidden'][name='"+data.name+"']";
                var retVal = Query.findEl(data);
                return $(retVal);
            },

            findElByID : function(data) {
                if (!data.id) {
                    throw new Error("Method requires an ID to be passed in.");
                }
                return ($('#'+data.id));
            },

            findElByClass : function(data) {
                if (!data.className) {
                    throw new Error("Method requires an className to be passed in.");
                }
                return ($('.'+data.id));
            },

            clearAllInputs : function() {
                $('input[type=text]').val("");
            }

        }
    };

})();