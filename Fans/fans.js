let minus = document.getElementById('minus');
let plus = document.getElementById('plus');
let quantity = document.getElementById('quantity');

minus.addEventListener('click', ()=>{
    let quantVal = quantity.innerHTML;
    if(quantVal == 0) return;
    quantity.innerHTML = quantVal-1;
})

plus.addEventListener('click', ()=>{
    let quantVal = Number(quantity.innerHTML);
    quantity.innerHTML = quantVal+1;
})

quantity.addEventListener('click', ()=>{
    console.log(quantity)
})