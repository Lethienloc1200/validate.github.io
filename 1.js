
function Validator(options) {
    var formElement = document.querySelector(options.form)


    
    function validate (inputElement, rule) {

        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);

        
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            
            inputElement.parentElement.classList.add('maudo')
        
        } else {
            errorElement.innerText = '';
           
            inputElement.parentElement.classList.remove('maudo')
            
        }

    }
    if (formElement) {
        options.rules.forEach(function(rule) {
            var inputElement = formElement.querySelector(rule.selector);
           
            if (inputElement) {
           
                inputElement.onblur = function () {
                    validate(inputElement,rule)
                }
                inputElement.oninput = function() {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
             
                    errorElement.innerText = '';           
                    inputElement.parentElement.classList.remove('invalid')
 
                }
            }
        });
    }
}

Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : message || 'Không đúng định dạng gmail'
        }
    }
}

Validator.minLength = function(selector, min, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập ${min} kí tự trở lên`;
        }
    }
}

Validator.isConfirmed = function(selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message || 'mật khẩu  không chính xác'
                                                   
        }
    }
}