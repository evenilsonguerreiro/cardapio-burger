const Menu = document.getElementById('menu')
const CartBtn = document.getElementById('cart-btn')
const CartModal = document.getElementById('cart-modal')
const ClossModalBtn = document.getElementById('closs-modal-btn')


CartBtn.addEventListener('click', function(){
    CartModal.style.display = 'flex'
})

ClossModalBtn.addEventListener('click', function (){
    CartModal.style.display = 'none'
})