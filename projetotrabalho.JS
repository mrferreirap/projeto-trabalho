// Produtos de construção
class Product {
    constructor(name, model, year) {
        this.name = name;
        this.model = model;
        this.year = year;
    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Produto</strong>: ${product.name} -
                    <strong>Modelo</strong>: ${product.model} - 
                    <strong>Ano</strong>: ${product.year}
                    <button class="btn btn-danger" name="delete">Excluir</button>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
        if (element.name === 'delete') {
            element.closest('.card').remove();
            this.showMessage('Produto deletado com sucesso', 'success');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(() => div.remove(), 3000);
    }
}
// arquivamento LocalStorage 
        class Store {
            static getProducts() {
                let products = localStorage.getItem('products');
                return products ? JSON.parse(products) : [];
            }

            static addProduct(product) {
                const products = Store.getProducts();
                products.push(product);
                localStorage.setItem('products', JSON.stringify(products));
            }

            static removeProduct(name, model, year) {
                let products = Store.getProducts();
                products = products.filter(p => !(p.name === name && p.model === model && p.year === year));
                localStorage.setItem('products', JSON.stringify(products));
            }
        }

// Eventos DOM
document.getElementById('product-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const model = document.getElementById('model').value.trim();
    const year = document.getElementById('year').value.trim();

    const product = new Product(name, model, year);
    const ui = new UI();

    if (name === '' || model === '' || year === '') {
        ui.showMessage('Por favor, preencha todos os campos', 'danger');
        return;
    }

    ui.addProduct(product);
    ui.showMessage('Produto adicionado com sucesso', 'success');
    ui.resetForm();
});

document.getElementById('product-list').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteProduct(e.target);
});
