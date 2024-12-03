import imageBaklava from '../assets/images/image-baklava.jpg';
import imageBrownie from '../assets/images/image-brownie.jpg';
import imageCake from '../assets/images/image-cake.jpg';
import imageCremeBrulee from '../assets/images/image-creme-brulee.jpg';
import imageMacaron from '../assets/images/image-macaron.jpg';
import imageMeringue from '../assets/images/image-meringue.jpg';
import imagePannaCotta from '../assets/images/image-panna-cotta.jpg';
import imageTiramisu from '../assets/images/image-tiramisu.jpg';
import imageWaffle from '../assets/images/image-waffle.jpg';
import '../css/styles.css';

const productsListElement = document.getElementById('products-list');
const noProductsElement = document.getElementById('no-products');
const sugarlessCheckboxElement = document.getElementById('sugarless-checkbox');
const searchInputElement = document.getElementById('search');
const orderByElement = document.getElementById('order-by');

// Creamos un array de objetos
const PRODUCTS = [
  {
    name: 'Waffle with Berries',
    image: imageWaffle,
    price: 6.5,
    sugarless: true
  },
  {
    name: 'Vanilla Bean Crème Brûlée',
    image: imageCremeBrulee,
    price: 7,
    sugarless: true
  },
  {
    name: 'Macaron Mix of Five',
    image: imageMacaron,
    price: 8,
    sugarless: false
  },
  {
    name: 'Classic Tiramisu',
    image: imageTiramisu,
    price: 5.5,
    sugarless: false
  },
  {
    name: 'Pistachio Baklava',
    image: imageBaklava,
    price: 4,
    sugarless: true
  },
  {
    name: 'Lemon Meringue Pie',
    image: imageMeringue,
    price: 5,
    sugarless: true
  },
  {
    name: 'Red Velvet Cake',
    image: imageCake,
    price: 4.5,
    sugarless: false
  },
  {
    name: 'Salted Caramel Brownie',
    image: imageBrownie,
    price: 5.5,
    sugarless: false
  },
  {
    name: 'Vanilla Panna Cotta',
    image: imagePannaCotta,
    price: 6.5,
    sugarless: true
  }
];

const resetSearch = () => (searchInputElement.value = '');
const resetInput = () => (sugarlessCheckboxElement.checked = false);
const resetOrderBy = () => (orderByElement.selectedValue = 'default');

const printProducts = products => {
  productsListElement.textContent = '';
  if (products.length === 0) {
    noProductsElement.classList.remove('hide');
    return;
  } else {
    noProductsElement.classList.add('hide');
  }

// Utilizamos fragment para crear dinámicamente la estructura de cada producto
  const fragment = document.createDocumentFragment();
  products.forEach(product => {
    const newProductContainer = document.createElement('div');
    newProductContainer.classList.add('product');

    const newImage = document.createElement('img');
    newImage.src = product.image;

    const newTitle = document.createElement('h2');
    newTitle.textContent = product.name;
    newTitle.classList.add('product-title');

    const newTag = document.createElement('span');
    newTag.classList.add('product-tag');
    if (product.sugarless) {
      newTag.textContent = 'Sugarless';
    }

    const newSpan = document.createElement('span');
    newSpan.textContent = '$' + product.price.toFixed(2);
    newSpan.classList.add('product-price');

    newProductContainer.append(newImage, newTitle, newTag, newSpan);

    fragment.append(newProductContainer);
  });
  productsListElement.append(fragment);
};

// Filtro de sugarless

// - event.target hace referencia al elemento que ha disparado el evento, en este caso, el checkbox con el id sugarless-checkbox
// - Verificamos si el checkbox está activado
// Si isSugarless es false (es decir, el checkbox NO está marcado), se ejecuta el bloque de código dentro de este if
// printProducts(PRODUCTS): Llama a la función printProducts y le pasa el array completo PRODUCTS, lo que significa que se mostrarán todos los productos (sin ningún filtro).

const filterProductsBySugarless = event => {
  const isSugarless = event.target.checked;
  if (!isSugarless) {
    printProducts(PRODUCTS);
    return;
  }

/*   const filteredProducts = PRODUCTS.filter((product) => {
    if (product.sugarless) {
      return true;
    } else {
      return false;
    }
  });

  printProducts(filteredProducts);
} */

// // 3. Si el checkbox está marcado, procedemos a filtrar los productos sin azúcar
  
  const filteredProducts = PRODUCTS.filter(product => product.sugarless);
  printProducts(filteredProducts);
};

const filteredProductsByName = event => {
// Estas funciones se llaman para asegurarse de que el filtro de azúcar y el orden no interfieran con la búsqueda por nombre
  resetInput();
  resetOrderBy();
// // 1. Obtener el valor de búsqueda (lo que el usuario ingresa en el campo de texto)
  const search = event.target.value;

// 2. Si no hay texto en el campo de búsqueda, mostramos todos los productos
  if (!search) {
    printProducts(PRODUCTS);
    return;
  }
// 3. Filtrar los productos cuyo nombre incluye el texto de búsqueda (no importa si las letras están en mayúsculas o minúsculas)
  const filteredProducts = PRODUCTS.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
  printProducts(filteredProducts);
};

const sortBy = event => {
  resetInput();
  resetSearch();
// 1. Obtener el valor del menú desplegable (la opción seleccionada)
  const order = event.target.value;
// 2. *** NUEVO! SPREAD OPERATOR *** Crear una copia del array de productos para no modificar el array original. 
  const sortedProducts = [...PRODUCTS];

  if (order === 'name') {
   // Ordenar alfabéticamente por el nombre de los productos
    // localeCompare: Este método es muy útil cuando necesitas realizar ordenaciones que respeten las reglas del idioma, como en la comparación de nombres, direcciones, o cualquier tipo de texto en una aplicación multilingüe
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (order === 'price') {
    // Ordenar por precio ascendente, si lo queremos descendente (b.price - a.price)
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  printProducts(sortedProducts);
};

printProducts(PRODUCTS);

sugarlessCheckboxElement.addEventListener('change', filterProductsBySugarless);
searchInputElement.addEventListener('input', filteredProductsByName);
orderByElement.addEventListener('change', sortBy);