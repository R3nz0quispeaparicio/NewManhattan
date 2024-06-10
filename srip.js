function loadMenu() {
    const menuList = document.querySelector('#menu-list');
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'database.php?action=getMenuItems', true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const menuItems = JSON.parse(xhr.responseText);

                    menuList.innerHTML = '';

                    menuItems.forEach(item => {
                        const menuItemElement = document.createElement('div');
                        menuItemElement.classList.add('menu-item');
                        menuItemElement.innerHTML = `
                            <h3>${item.name}</h3>
                            <p>${item.description}</p>
                            <p class="price">Precio: $${item.price.toFixed(2)}</p>
                        `;
                        menuList.appendChild(menuItemElement);
                    });
                } else {
                    console.error('Error al cargar el menú');
                }
            };
            xhr.send();
        }

function loadOrders() {
    const orderList = document.querySelector('#order-list');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'database.php?action=getOrders', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const orders = JSON.parse(xhr.responseText);

            orderList.innerHTML = '';

            orders.forEach(order => {
                const orderElement = document.createElement('div');
                orderElement.innerHTML = `
                    <h3>Mesa #${order.table_number}</h3>
                    <p>Estado: ${order.order_status}</p>
                    <ul>
                    </ul>
                `;
                orderList.appendChild(orderElement);
            });
        } else {
            console.error('Error al cargar los pedidos');
        }
    };
    xhr.send();
}

function sendMessage() {
    const chatInput = document.querySelector('#chat-input');
    const chatMessages = document.querySelector('#chat-messages');
    const message = chatInput.value.trim();

    if (message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatInput.value = '';
    }
}

document.querySelector('#chat-form').addEventListener('submit', e => {
    e.preventDefault();
    sendMessage();
});

window.addEventListener('load', function() {
    loadMenu();
    loadOrders();
});