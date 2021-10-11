// Menu
var iconMenu = document.querySelector('.icon-menu');

if (iconMenu != null) {
	var delay = 500;
	var body = document.querySelector('body');
	var menuBody = document.querySelector('.menu__body');
	iconMenu.addEventListener('click', function (e) {
		if (!body.classList.contains('_wait')) {
			//   body_lock(delay);
			iconMenu.classList.toggle('_active');
			menuBody.classList.toggle('_active');
		}
	});
} //=================

function menu_close() {
	var iconMenu = document.querySelector('.icon-menu');
	var menuBody = document.querySelector('.menu__body');
	iconMenu.classList.remove('_active');
	menuBody.classList.remove('_active');
} //=================

// Scroll to top button
var basicScrollTop = function () {
	var btnTop = document.querySelector('.toTopBtn');
	var btnReveal = function () {
		if (window.scrollY >= 100) {
			btnTop.classList.add('is-visible');
		} else {
			btnTop.classList.remove('is-visible');
		}
	};
	window.addEventListener('scroll', btnReveal);
};
basicScrollTop(); //=================

//=================

// Dynamic Adapt v.1
// HTML data-move="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-move="item,2,992"
// Andrikanych Yevhen 2020
var move_array = [];
var move_objects = document.querySelectorAll('[data-move]');

if (move_objects.length > 0) {
	for (var _index10 = 0; _index10 < move_objects.length; _index10++) {
		var _el6 = move_objects[_index10];

		var data_move = _el6.getAttribute('data-move');

		if (data_move != '' || data_move != null) {
			_el6.setAttribute('data-move-index', _index10);

			move_array[_index10] = {
				parent: _el6.parentNode,
				index: index_in_parent(_el6),
			};
		}
	}
}

function dynamic_adapt() {
	var w = document.querySelector('body').offsetWidth;

	if (move_objects.length > 0) {
		for (var _index11 = 0; _index11 < move_objects.length; _index11++) {
			var _el7 = move_objects[_index11];

			var _data_move = _el7.getAttribute('data-move');

			if (_data_move != '' || _data_move != null) {
				var data_array = _data_move.split(',');

				var data_parent = document.querySelector('.' + data_array[0]);
				var data_index = data_array[1];
				var data_bp = data_array[2];

				if (w < data_bp) {
					if (!_el7.classList.contains('js-move_done_' + data_bp)) {
						if (data_index > 0) {
							//insertAfter
							var actual_index =
								index_of_elements(data_parent)[data_index];
							data_parent.insertBefore(
								_el7,
								data_parent.childNodes[actual_index]
							);
						} else {
							data_parent.insertBefore(
								_el7,
								data_parent.firstChild
							);
						}

						_el7.classList.add('js-move_done_' + data_bp);
					}
				} else {
					if (_el7.classList.contains('js-move_done_' + data_bp)) {
						dynamic_adaptive_back(_el7);

						_el7.classList.remove('js-move_done_' + data_bp);
					}
				}
			}
		}
	}

	custom_adapt(w);
}

function dynamic_adaptive_back(el) {
	var index_original = el.getAttribute('data-move-index');
	var move_place = move_array[index_original];
	var parent_place = move_place['parent'];
	var index_place = move_place['index'];

	if (index_place > 0) {
		//insertAfter
		var actual_index = index_of_elements(parent_place)[index_place];
		parent_place.insertBefore(el, parent_place.childNodes[actual_index]);
	} else {
		parent_place.insertBefore(el, parent_place.firstChild);
	}
}

function index_in_parent(node) {
	var children = node.parentNode.childNodes;
	var num = 0;

	for (var _i2 = 0; _i2 < children.length; _i2++) {
		if (children[_i2] == node) return num;
		if (children[_i2].nodeType == 1) num++;
	}

	return -1;
}

function index_of_elements(parent) {
	var children = [];

	for (var _i3 = 0; _i3 < parent.childNodes.length; _i3++) {
		if (
			parent.childNodes[_i3].nodeType == 1 &&
			parent.childNodes[_i3].getAttribute('data-move') == null
		) {
			children.push(_i3);
		}
	}

	return children;
}

window.addEventListener('resize', function (event) {
	dynamic_adapt();
});
dynamic_adapt();

function custom_adapt(w) {}
//=================

// cats json
const cats = [
	{
		name: 'Кот полосатый',
		color: 'Коричневый окрас',
		age: '2',
		paws: '4',
		price: '50000',
		image: 'cat1.png',
		sold: false,
		discount: '-40',
	},
	{
		name: 'Кот полосатый',
		color: 'Коричневый окрас',
		age: '1',
		paws: '4',
		price: '32000',
		image: 'cat2.png',
		sold: true,
		discount: '0',
	},
	{
		name: 'Кот полосатый',
		color: 'Коричневый окрас',
		age: '4',
		paws: '4',
		price: '35000',
		image: 'cat3.png',
		sold: false,
		discount: '0',
	},
	{
		name: 'Кот полосатый',
		color: 'Коричневый окрас',
		age: '3',
		paws: '4',
		price: '30000',
		image: 'cat1.png',
		sold: false,
		discount: '0',
	},
	{
		name: 'Кот полосатый',
		color: 'Коричневый окрас',
		age: '1',
		paws: '4',
		price: '40000',
		image: 'cat3.png',
		sold: false,
		discount: '-40',
	},
	{
		name: 'Кот полосатый',
		color: 'Коричневый окрас',
		age: '2',
		paws: '4',
		price: '20000',
		image: 'cat2.png',
		sold: true,
		discount: '0',
	},
]; //=================

// build cats on page load
document.addEventListener('DOMContentLoaded', function () {
	cats.forEach((item) => {
		document.querySelector('.products__wrapper').innerHTML += `
			<div class="products__item product">
				<div class="product__header">
					<div class="product__header__img">
						<img
							src="./assets/img/${item.image}"
							alt="${item.name}"
						/>
					</div>
					<div class="product__header__status"><span class="like__btn"></span></div>
					${
						item.discount < 0
							? "<div class='product__header__sale'>" +
							  item.discount +
							  '</div>'
							: ''
					}
				</div>
				<div class="product__text">
					<div class="product__title">
						${item.name}
					</div>
					<div class="product__info">
						<div class="product__info__color">
							${item.color}
						</div>
						<div class="product__info__age">
							<span>${item.age} мес.</span>
							Возраст
						</div>
						<div class="product__info__paws">
							<span>${item.paws}</span>
							Кол-во лап
						</div>
					</div>
					<div class="product__price">${item.price} руб.</div>
				</div>
				${
					item.sold == true
						? "<a href='#' class='product__button btn sold-out'>Продан</a>"
						: "<a href='#' class='product__button btn'>Купить</a>"
				}
			</div>
		`;
	});
}); //=================

// sort
function sort(arr, value) {
	const temp = JSON.parse(JSON.stringify(arr));

	temp.sort((a, b) => (a[value] > b[value] ? 1 : -1));

	document.querySelector('.products__wrapper').innerHTML = '';

	temp.forEach((item) => {
		document.querySelector('.products__wrapper').innerHTML += `
			<div class="products__item product">
				<div class="product__header">
					<div class="product__header__img">
						<img
							src="./assets/img/${item.image}"
							alt="${item.name}"
						/>
					</div>
					<div class="product__header__status"><span class="like__btn"></span></div>
					${
						item.discount < 0
							? "<div class='product__header__sale'>" +
							  item.discount +
							  '</div>'
							: ''
					}
				</div>
				<div class="product__text">
					<div class="product__title">
						${item.name}
					</div>
					<div class="product__info">
						<div class="product__info__color">
							${item.color}
						</div>
						<div class="product__info__age">
							<span>${item.age} мес.</span>
							Возраст
						</div>
						<div class="product__info__paws">
							<span>${item.paws}</span>
							Кол-во лап
						</div>
					</div>
					<div class="product__price">${item.price} руб.</div>
				</div>
				${
					item.sold == true
						? "<a href='#' class='product__button btn sold-out'>Продан</a>"
						: "<a href='#' class='product__button btn'>Купить</a>"
				}
			</div>
		`;
	});
}
document.querySelector('.sort-menu').addEventListener('click', (event) => {
	if (
		!event.target.classList.contains('sort-menu__btn') ||
		event.target.classList.contains('_active')
	)
		return false;
	document.querySelectorAll('.sort-menu__btn').forEach((btn) => {
		if (btn.classList.contains('_active')) {
			btn.classList.remove('_active');
		}
	});
	event.target.classList.add('_active');
	let value = event.target.dataset['sort'];

	sort(cats, value);
}); //=================

// Like button & notification
document
	.querySelector('.products__wrapper')
	.addEventListener('click', (event) => {
		if (event.target.classList.contains('like__btn')) {
			if (event.target.classList.contains('_active')) {
				event.target.classList.remove('_active');
			} else {
				event.target.classList.add('_active');
				document
					.querySelector('.notification__container')
					.insertAdjacentHTML(
						'afterbegin',
						'<div class="notification__item">Товар добавлен в избранное</div>'
					);
			}
		}
		return false;
	});

const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const inpW = document.querySelector('.form-subscribe__input');
const inp = document.querySelector('.form-subscribe__input .input');
let err = document.createElement('span');
err.classList.add('_error');
err.innerHTML += `
	Введите почту в правильном формате
`;

document
	.querySelector('.form-subscribe__btn')
	.addEventListener('click', (e) => {
		e.preventDefault();
		if (!validate(regex, inp.value)) {
			inp.classList.add('_error');
			inpW.insertAdjacentElement('beforeend', err);
			setTimeout(removeErr, 3000);
		}
	});

function validate(regex, inp) {
	return regex.test(inp);
}

function removeErr() {
	document
		.querySelector('.form-subscribe__input .input')
		.classList.remove('_error');
	document.querySelector('span._error').remove();
}
