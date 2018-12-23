btn.addEventListenter('click',function(e){
    let n = amount.innerText;
    let number = parseInt(n)
    let newNumber = number -1
    amount.innerText = newNumber;
})