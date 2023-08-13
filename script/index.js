document.addEventListener("DOMContentLoaded", () => {
    const tel = document.querySelector('.js-tel-input')
    const button = document.querySelector('.button')
    const spanInvalid = document.querySelector('.invalid-input')
    const modal = document.querySelector('.modal-wrapper')
    const modalWindow = document.querySelector('.modal-window')
    const closBtn = document.querySelector('.close-modal')
    const prices = document.querySelectorAll('.price')
    const getInputNumbersValue = (input) => {
        return input.value.replace(/\D/g, '');
    }
    const onPhoneInput = (evt) => {
        let input = evt.target,
            inputNumbersValue = getInputNumbersValue(input),
            formattedInputValue = '';

        if (!inputNumbersValue) {
            return input.value = '';
        }
        if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
            // Russian number
            if (inputNumbersValue[0] === '9') {
                inputNumbersValue = '7' + inputNumbersValue;
            }
            let firstSymbols = (inputNumbersValue[0] === '8') ? '+7' : '+7';

            formattedInputValue = firstSymbols + '';

            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }

            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }

            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }

            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        }
        button.addEventListener('click', () => {
            if (formattedInputValue.length != 17 || formattedInputValue.length == 2) {
                tel.classList.add('invalid')
                spanInvalid.classList.add('invalid')
            } else {
                tel.classList.remove('invalid')
                spanInvalid.classList.remove('invalid')
                modalWindow.style.top = `${window.scrollY}px`
                modalWindow.classList.add('active')
                modal.classList.add('active')
                input.value = formattedInputValue  = ''
            }
        })
        if (input.value.length != 18 ) {
            tel.classList.add('invalid')
            spanInvalid.classList.add('invalid')
        } else {
            tel.classList.remove('invalid')
            spanInvalid.classList.remove('invalid')
        }
        return input.value = formattedInputValue;
    }
    closBtn.addEventListener('click', () => {
        modal.classList.remove('active')
        modalWindow.classList.remove('active')
    })
    button.addEventListener('click', () => {
        if (tel.value.length == 0) {
            tel.classList.add('invalid')
            spanInvalid.classList.add('invalid')
        }
    })
    tel.addEventListener('input', onPhoneInput);
    function normalizedPrice(priceString) {
        const priceDel = priceString.split(' '),
              priceNum = Number(priceDel[0])
        priceString = priceNum.toLocaleString("ru-RU") + ' ' + priceDel[1]
        return priceString
    }
    prices.forEach(price => {
        price.textContent = normalizedPrice(price.textContent)
    })
});