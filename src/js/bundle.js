/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calc": () => (/* binding */ calc)
/* harmony export */ });

	function calc() {
		const result = document.querySelector('.calculating__result span');
		
		let sex, height, weight, age, ratio;

		if (localStorage.getItem('sex')) {
			sex = localStorage.getItem('sex');
		} else {
			sex = 'female';
			localStorage.setItem('sex', 'female');
		}

		if (localStorage.getItem('ratio')) {
			ratio = localStorage.getItem('ratio');
		} else {
			ratio = 1.375;
			localStorage.setItem('ratio', 1.375);
		}

		function initLocalSettings(selector, activeClass) {
			const elements = document.querySelectorAll(selector);

			elements.forEach(item => {
				item.classList.remove(activeClass);
				if (item.getAttribute('id') === localStorage.getItem('sex')) {
					item.classList.add(activeClass);
				}
				if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
					item.classList.add(activeClass);
				}
			});
		}

		initLocalSettings('#gender div', 'calculating__choose-item_active');
		initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

		function calcTotal() {
			if (!sex || !height || !weight || !age || !ratio) {
				result.textContent = '____';
				return; // прописываем return, чтобы функция дальше не работала
			}

			if (sex === 'female') {
				result.textContent = Math.floor((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
			} else {
				result.textContent = Math.floor((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
			}
		}
		calcTotal();


		function getStaticInformation(selector, activeClass) { // получения статичных данных
			const elements = document.querySelectorAll(selector); // получили все div внутри родительского блока

			elements.forEach(item => { // в это случае луче вешать обработчик на каждый элемент, а не родителя
					item.addEventListener('click', (e) => {
						if (e.target.getAttribute('data-ratio')) { // если кликнули, а там data атрибут
							ratio = +e.target.getAttribute('data-ratio'); // получили число data атрибута
							localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
						} else {
							sex = e.target.getAttribute('id'); // или кликнули и получили id пола
							localStorage.setItem('sex', e.target.getAttribute('id'));
						}
		
						elements.forEach(item => { // перебрали все элементы div
							item.classList.remove(activeClass); //удалили класс активности
						});
		
						e.target.classList.add(activeClass); // тот по которому кликнули добавили класс активности
						calcTotal();
					});
			});
		}

		getStaticInformation('#gender div', 'calculating__choose-item_active');
		getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

		function getDinamicInformation(selector) { // получение динамичных данных
			const input = document.querySelector(selector); // получили все инпуты блока

			input.addEventListener('input', () => { // проверили наличие ввода в инпут

				if (input.value.match(/\D/g)) { // проверка на ввод буквы
					input.style.border = '1px solid red';
				} else {
					input.style.border = 'none';
				}

				switch(input.getAttribute('id')) { // если определенное id, 
					case 'height': //то введи данные в это id
						height = +input.value; // данные записаны
						break; // остальной код прекрати
					case 'weight':
						weight = +input.value;
						break;
					case 'age':
						age = +input.value;
						break;	
				}
				calcTotal();
			});
		}
		getDinamicInformation('#height');
		getDinamicInformation('#weight');
		getDinamicInformation('#age');
	}

	/* module.exports = calc; */
	

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cards": () => (/* binding */ cards)
/* harmony export */ });
/* harmony import */ var _services_servisec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/servisec */ "./src/js/services/servisec.js");

	
	function cards() {
		class MenuCard {
			constructor(src, alt, title, descry, price, parentSelector, ...classes) {
				this.src = src;
				this.alt = alt;
				this.title = title;
				this.descr = descry;
				this.price = price;
				this.classes = classes;
				this.parent = document.querySelector(parentSelector);
				this.transfer = 27;
				this.changeToUAH();
			}

			changeToUAH() {
				this.price = this.price * this.transfer;
			}

			render() {
				const element = document.createElement('div');
				if (this.classes.length === 0){
					this.element = 'menu__item';
					element.classList.add(this.element);
				} else {
					this.classes.forEach(className => element.classList.add(className));
				}
				element.innerHTML = `
					<img src=${this.src} alt=${this.alt}>
					<h3 class="menu__item-subtitle">${this.title}</h3>
					<div class="menu__item-descr">${this.descr}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
					</div>
				`;
				this.parent.append(element);
			}
		}
		
		// получать данные
		(0,_services_servisec__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
			.then(data => {
				data.forEach(({img, altimg, title, descr, price}) => {
					new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
				});
			});
	}

	/* module.exports = cards; */
	

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "forms": () => (/* binding */ forms)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_servisec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/servisec */ "./src/js/services/servisec.js");

	
	
	
	function forms(formSelector ,modalTimerId) {
		const forms = document.querySelectorAll(formSelector);

		const message = {
			loading: 'img/form/spinner.svg',
			sucsess: 'Спасибо! Скоро мы с вами свяжемся',
			failure: 'Что-то пошло не так'
		};

		forms.forEach(item => {
			bindPostData(item);
		});

		function bindPostData(form) {
			form.addEventListener('submit', (e) => {
				e.preventDefault();

				const statusMessage = document.createElement('img');
				statusMessage.src = message.loading;
				statusMessage.style.cssText = `  
						display: block;
						margin: 0 auto;
					`;
				statusMessage.textContent = message.loading;
				
				form.insertAdjacentElement('afterend', statusMessage);
				
				const formData = new FormData(form);

				/* const object = {}; //! преобразуем формДата в json более элегантно
				formData.forEach(function(value, key){
					object[key] = value;
				}); */

				const json = JSON.stringify(Object.fromEntries(formData.entries())); //собрали данные от формы и отправили на сервер
	
				(0,_services_servisec__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json) // сюда отправили
				.then(data => {
					console.log(data);
					showThanksModal(message.sucsess);
					statusMessage.remove();
				}).catch(() => {	
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				});

			});
		}

		function showThanksModal(message) {
			const prevModalDialog = document.querySelector('.modal__dialog');
			prevModalDialog.classList.add('hide');

			(0,_modal__WEBPACK_IMPORTED_MODULE_0__.opModal)('.modal', modalTimerId);

			const thanksModal = document.createElement('div');
			thanksModal.classList.add('modal__dialog');
			thanksModal.innerHTML = `
				<div class = "modal__content">
					<div class = "modal__close" data-close>&times;</div>
					<div class = "modal__title">${message}</div>
				</div>
			`;

			document.querySelector('.modal').append(thanksModal);
			setTimeout(() => {
				thanksModal.remove();
				prevModalDialog.classList.add('show');
				prevModalDialog.classList.remove('hide');
				(0,_modal__WEBPACK_IMPORTED_MODULE_0__.clModal)('.modal');
			}, 4000);
		}

		fetch('http://localhost:3000/menu')
			.then(data => data.json())
			.then(res => console.log(res));
	}

	/* module.exports = forms; */
	


	

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clModal": () => (/* binding */ clModal),
/* harmony export */   "modal": () => (/* binding */ modal),
/* harmony export */   "opModal": () => (/* binding */ opModal)
/* harmony export */ });
	function clModal(modalSelector) {
		const modal = document.querySelector(modalSelector);
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}
	function opModal(modalSelector, modalTimerId) {
		const modal = document.querySelector(modalSelector);
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		console.log(modalTimerId);
		if (modalTimerId) {
			clearInterval(modalTimerId);
		}
	}

	function modal(triggerSelector, modalSelector, modalTimerId) {
		const modalTrigger = document.querySelectorAll(triggerSelector);
		const modal = document.querySelector(modalSelector);

		modalTrigger.forEach(item => {
			item.addEventListener('click', () => opModal(modalSelector, modalTimerId)); // обернули в функцию, чтобы opMpdal работал при клике
		});
	

		modal.addEventListener('click', (e) => {
			if(e.target === modal || e.target.getAttribute('data-close') == '') {
				clModal(modalSelector);
			}
		});
		// если нажали Escape закрыли модальное окно
		document.addEventListener('keydown', (e) => {
			if (e.code === 'Escape' && modal.classList.contains('show')) {
				clModal(modalSelector);
			}
		});

		function showScrollModal() {
			if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
				opModal(modalSelector, modalTimerId);
				window.removeEventListener('scroll', showScrollModal);
			}
		}

		window.addEventListener('scroll', showScrollModal);
	}

	/* module.exports = modal; */
	
	
	

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "slider": () => (/* binding */ slider)
/* harmony export */ });

	function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
		const slides = document.querySelectorAll(slide),
				slider = document.querySelector(container),
				prev = document.querySelector(prevArrow),
				next = document.querySelector(nextArrow),
				total = document.querySelector(totalCounter),
				current = document.querySelector(currentCounter),
				slidesWrapper = document.querySelector(wrapper),
				slidesField = document.querySelector(field),
				width = window.getComputedStyle(slidesWrapper).width;
		let slideIndex = 1;
		let offset = 0;

		function getZero(num) {
			if (num >= 0 && num < 10) {
				return `0${num}`;
			} else {
				return num;
			}
		}

		total.textContent = getZero(slides.length);
		

		slidesField.style.width = 100 * slides.length + '%';
		slidesField.style.display = 'flex';
		slidesField.style.transition = '0.5s all';

		slidesWrapper.style.overflow = 'hidden'; // скрыли все слайды кроме текущего

		slides.forEach(item => {
			item.style.width = width;
		});

		//! Добавялем dot

		slider.style.position = 'relative';

		const indicators = document.createElement('ol'),
				dots = [];
		indicators.classList.add('carousel-indicators');
		indicators.style.cssText = `
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 15;
			display: flex;
			justify-content: center;
			margin-right: 15%;
			margin-left: 15%;
			list-style: none;
		`;
		slider.append(indicators);

		for (let i = 0; i < slides.length; i++) {
			const dot = document.createElement('li');
			dot.setAttribute('data-slide-to', i + 1); // установили атрибут каждому dot
			dot.style.cssText = `
				box-sizing: content-box;
				flex: 0 1 auto;
				width: 30px;
				height: 6px;  
				margin-right: 3px;
				margin-left: 3px;
				cursor: pointer;
				background-color: #fff;
				background-clip: padding-box;
				border-top: 10px solid transparent;
				border-bottom: 10px solid transparent;
				opacity: .5;
				transition: opacity .6s ease;
			`;

			if (i === 0) {
				dot.style.opacity = 1;
			}
			indicators.append(dot);
			dots.push(dot);
		}

		function getDots(arrDots) {
			arrDots.forEach(item => item.style.opacity = '.5');
			arrDots[slideIndex - 1].style.opacity = 1;
		}

		function getNumberWidth(str) {
			return +str.replace(/\D/g, '');
		}

		next.addEventListener('click', () => {
			if (offset == getNumberWidth(width)  * (slides.length - 1)) { // '500px'
				offset = 0;
			} else {
				offset += getNumberWidth(width); // Здесь добавляется ширина следующего слайда
			}

			slidesField.style.transform = `translateX(-${offset}px)`;
			
			if (slideIndex == slides.length) {
				slideIndex = 1;
			} else {
				slideIndex++;
			}
			current.textContent = getZero(slideIndex);

			getDots(dots);

		});

		prev.addEventListener('click', () => {
			if (offset == 0) { // '500px'
				offset = getNumberWidth(width)  * (slides.length - 1);
			} else {
				offset -= getNumberWidth(width); // Здесь добавляется ширина следующего слайда
			}

			slidesField.style.transform = `translateX(-${offset}px)`;
			if (slideIndex == 1) {
				slideIndex = slides.length;
			} else {
				slideIndex--;
			}
			
			current.textContent = getZero(slideIndex);
			getDots(dots);
			
		});

		dots.forEach(item => {
			item.addEventListener('click', (e) => {
				const slideTo = e.target.getAttribute('data-slide-to');
				slideIndex = slideTo;
				offset = getNumberWidth(width)  * (slideTo - 1);
				slidesField.style.transform = `translateX(-${offset}px)`;
				
				current.textContent = getZero(slideIndex);
				getDots(dots);
				
			});
		});
	}

	/* module.exports = slider; */
	

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tabs": () => (/* binding */ tabs)
/* harmony export */ });

	function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
		// tabs
		const tabs = document.querySelectorAll(tabsSelector),
				tabsContent = document.querySelectorAll(tabsContentSelector),
				tabsParent = document.querySelector(tabsParentSelector);
			
		function hideTabContent() {
			tabsContent.forEach(item => {
				item.classList.add('hide');
				item.classList.remove('show', 'fade');
			});
			tabs.forEach(item => {
				item.classList.remove(activeClass);
			});
		}

		function showTabContent(i = 0) {
			tabsContent[i].classList.add('show', 'fade');
			tabsContent[i].classList.remove('hide');
			tabs[i].classList.add(activeClass);
		}
		hideTabContent();
		showTabContent();
		tabsParent.addEventListener('click', (event) => {
			let target = event.target;
			if (target && target.classList.contains(tabsSelector.slice(1))) {
				tabs.forEach((item, i) => {
					if (target === item) {
						hideTabContent();
						showTabContent(i);
					}
				});
			}
		});
	}

	/* module.exports = tabs; */
	

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timer": () => (/* binding */ timer)
/* harmony export */ });

	function timer(id, deadline) {
		function getTimeRemaining(endTime) {
			let days, hours,minutes, seconds;	
			const t = Date.parse(endTime) - Date.parse(new Date());
			if (t <= 0) {
					days = 0;
					hours = 0;
					minutes = 0;
					seconds = 0;
			} else {
					days = Math.floor(t / (1000 * 60 * 60 * 24));
					hours = Math.floor((t / (1000 * 60 * 60)) % 24);
					minutes = Math.floor((t / (1000 * 60)) % 60);
					seconds = Math.floor((t / 1000) % 60);
			}
			return {
				'total': t,
				'days': days,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			};
		}
		
		function getZero(num) {
			if (num >=0 && num < 10) {
				return `0${num}`;
			} else {
				return num;
			}
		}
		
		function setClock(selector, endTime) {
			const timer = document.querySelector(selector),
					days = timer.querySelector('#days'),
					hours = timer.querySelector('#hours'),
					minutes = timer.querySelector('#minutes'),
					seconds = timer.querySelector('#seconds'),
					timeInterval = setInterval(updateClock, 1000);
			
		updateClock();
			
			function updateClock() {
				const t = getTimeRemaining(endTime);

				days.innerHTML = getZero(t.days);
				hours.innerHTML = getZero(t.hours);
				minutes.innerHTML = getZero(t.minutes);
				seconds.innerHTML = getZero(t.seconds);

				if (t.total <= 0) {
					clearInterval(timeInterval);
				}
			}
		}
		setClock(id, deadline);
	}

	/* module.exports = timer; */
	

/***/ }),

/***/ "./src/js/services/servisec.js":
/*!*************************************!*\
  !*** ./src/js/services/servisec.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });

	//! Функция общения с сервером
	const postData = async (url, data) => { 
		const res = await fetch(url, { // посылаем наш запрос на сервер 
			method: "POST",
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});
		return await res.json(); // возвращаем этот запрос и трансформируем в json
	};

	async function getResource(url) { // get запрос
		let res = await fetch(url); // нужно уметь обработать fetch самому
		if (!res.ok) { // выкидываем ошибку вручную
			throw new Error(`Could not fetch ${url}, status: ${res.status}`); // викинуть ошибку
		}
		return await res.json();
	}

	
	

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
	
	
	
	
	
	
	
	
	
		
	window.addEventListener('DOMContentLoaded', () => {

		const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.opModal)('.modal', modalTimerId), 5000);

		//! старый стандарт модульной разработки
		/* const tabs = require('./modules/tabs'),
				modal = require('./modules/modal'),
				timer = require('./modules/timer'),
				cards = require('./modules/cards'),
				calc = require('./modules/calc'),
				forms = require('./modules/forms'),
				slider = require('./modules/slider');

		tabs();
		modal();
		timer();
		cards();
		calc();
		forms();
		slider(); */

		//! Новый стандарт, появился в ES6
	
		(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.tabs)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
		(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.modal)('[data-modal]', '.modal', modalTimerId);
		(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.timer)('.timer', '2022-11-20');
		(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.cards)();
		(0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__.calc)();
		(0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__.forms)('form', modalTimerId);
		(0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__.slider)({
			container: '.offer__slider',
			nextArrow: '.offer__slider-next', 
			prevArrow: '.offer__slider-prev',
			slide: '.offer__slide',
			totalCounter: '#total', 
			currentCounter: '#current',
			wrapper: '.offer__slider-wrapper',
			field: '.offer__slider-inner'
		});
	});



		




 






})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map