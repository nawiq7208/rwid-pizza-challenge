/**
 * Write your code here.
 */

function updateResults() {
    let pizzaPrice = 0;
    const selectedPizza = document.querySelector('input[name="pizza"]:checked');
    const sizeInputs = document.querySelectorAll('input[name="size"]');
    const toppingInputs = document.querySelectorAll('input[name="topping"]');

    if (selectedPizza) {
        const pizzaContainer = selectedPizza.closest('.pizza-container');
        const priceLabel = pizzaContainer.querySelector('.pizza-price');
        pizzaPrice = parseFloat(priceLabel.textContent.replace('$', ''));

        sizeInputs.forEach((input) => (input.disabled = false));
        toppingInputs.forEach((input) => (input.disabled = false));

        const selectedSize = document.querySelector('input[name="size"]:checked');
        if (!selectedSize) {
            const mediumSizeInput = document.querySelector('input[name="size"][value="medium"]');
            if (mediumSizeInput) {
                mediumSizeInput.checked = true;
            }
        }
    } else {

        sizeInputs.forEach((input) => {
            input.checked = false;
            input.disabled = true;
        });
        toppingInputs.forEach((input) => {
            input.checked = false;
            input.disabled = true;
        });
    }

    let sizePrice = 0;
    const selectedSize = document.querySelector('input[name="size"]:checked');
    if (selectedSize) {
        const sizeValue = selectedSize.value;
        if (sizeValue === 'small') {
            sizePrice = -1;
        } else if (sizeValue === 'medium') {
            sizePrice = 0;
        } else if (sizeValue === 'large') {
            sizePrice = 2;
        }
    }

    let toppingPrice = 0;
    const selectedToppings = document.querySelectorAll('input[name="topping"]:checked');
    selectedToppings.forEach((topping) => {
        const priceText = topping.nextElementSibling.textContent;
        const regex = /\((\$[0-9.]+)\)/;
        const match = priceText.match(regex);
        if (match) {
            const toppingPriceValue = parseFloat(match[1].replace('$', ''));
            toppingPrice += toppingPriceValue;
        }
    });

    const totalPrice = pizzaPrice + sizePrice + toppingPrice;

    document.getElementById('pizza-result').textContent = '$' + pizzaPrice.toFixed(0);
    document.getElementById('size-result').textContent = '$' + sizePrice.toFixed(0);
    document.getElementById('topping-result').textContent = '$' + toppingPrice.toFixed(0);
    document.getElementById('total-result').textContent = '$' + totalPrice.toFixed(0);
}

const pizzaInputs = document.querySelectorAll('input[name="pizza"]');
const sizeInputs = document.querySelectorAll('input[name="size"]');
const toppingInputs = document.querySelectorAll('input[name="topping"]');

pizzaInputs.forEach((input) => {
    input.addEventListener('change', updateResults);
});

sizeInputs.forEach((input) => {
    input.addEventListener('change', updateResults);
});

toppingInputs.forEach((input) => {
    input.addEventListener('change', updateResults);
});

updateResults();

const resetOrder = () => {

    document.querySelectorAll('input[name="pizza"]').forEach((input) => (input.checked = false));
    document.querySelectorAll('input[name="size"]').forEach((input) => (input.checked = false));
    document.querySelectorAll('input[name="topping"]').forEach((input) => (input.checked = false));

    document.getElementById('pizza-result').textContent = '$0';
    document.getElementById('size-result').textContent = '$0';
    document.getElementById('topping-result').textContent = '$0';
    document.getElementById('total-result').textContent = '$0';
};

document.getElementById('reset-order').addEventListener('click', resetOrder);