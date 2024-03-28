const Menu = document.getElementById('menu')
const CartBtn = document.getElementById('cart-btn')
const CartModal = document.getElementById('cart-modal')
const ClossModalBtn = document.getElementById('closs-modal-btn')
const cartItemcontainer = document.getElementById('cart-itens')
const cartTotal = document.getElementById('cart-total')
const cautSpan = document.getElementById('cout-span')
const adressInput = document.getElementById('address')
const checoutBtn = document.getElementById('checkout-btn')
const adressWarn = document.getElementById('adress-warn')


let cart = []

// abrir carrinho //
CartBtn.addEventListener('click', function(){
    updateCartModal()
    CartModal.style.display = 'flex'
    
})

ClossModalBtn.addEventListener('click', function (){
    CartModal.style.display = 'none'
})

Menu.addEventListener('click', function(event){
    let paraentButton = event.target.closest(".cart-to-btn")
    if(paraentButton){
        const name = paraentButton.getAttribute('data-name')
        const price = parseFloat( paraentButton.getAttribute('data-price'))

       addtoCart(name, price)
        
    }
    
})
// função para adicionar no carrinho
function addtoCart(name, price){
    const existeItem = cart.find(item => item.name === name)

    if(existeItem){
        existeItem.quantidade += 1;
        
    } else {
        cart.push({
            name,
            price,
            quantidade: 1,
        })
    }
        updateCartModal() 
    }

   

// atualizar o carrinh //
function updateCartModal(){
    cartItemcontainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItemelemento = document.createElement('div');
        cartItemelemento.classList.add("flex","justify-between","mb-4","flex-col")

        cartItemelemento.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-bold">${item.name}</p>
                <p class="font-bold">Qtd: ${item.quantidade}</p>
                <p class="font-bold">R$ ${item.price.toFixed(2)}</p>
            </div>
        <div>
            <button class="remove-btn"data-name="${item.name}">
                Remover
            <button>
        </div>
        </div>
        `
        total += item.price * item.quantidade;
        cartItemcontainer.appendChild(cartItemelemento)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
    cautSpan.innerHTML = cart.length;
}

// função para remover item do carrinho /

cartItemcontainer.addEventListener('click', function(event){
    if(event.target.classList.contains("remove-btn")){
        const name = event.target.getAttribute('data-name')

        removerItemcart(name)
    }
})

function removerItemcart(name){
    const index = cart.findIndex(item => item.name === name)

    if(index !== -1){
        const item = cart[index]

        if(item.quantidade > 1){
            item.quantidade -= 1;
            updateCartModal()
            return
        }

        cart.splice(item, 1)
        updateCartModal()
    } 
}

adressInput.addEventListener('input', function(event){
    let inputValue = event.target.value;

    if(inputValue !== ''){
        adressInput.classList.remove('border-red-500')
        adressWarn.classList.add('hidden')
    }
})

checoutBtn.addEventListener('click', function(){
    if(cart.length === 0) return;

    if(adressInput.value === ''){
        adressWarn.classList.remove('hidden')
        adressInput.classList.add('border-red-500')
        return;
    }
})

// verificar a hora e manipular //
function checoutHoras(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
}

const spanItem = document.getElementById('data-span')
const isOpen = checoutHoras()

if(isOpen){
    spanItem.classList.remove('bg-red-500')
    spanItem.classList.add('bg-green-600')
} else {
    spanItem.classList.remove('bg-green-600')
    spanItem.classList.add('bg-red-500')
}
    
    