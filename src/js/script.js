	'use strict';
	import {tabs} from './modules/tabs';
	import {modal} from './modules/modal';
	import {timer} from './modules/timer';
	import {cards} from './modules/cards';
	import {calc} from './modules/calc';
	import {forms} from './modules/forms';
	import {slider} from './modules/slider';
	import {opModal} from './modules/modal';
		
	window.addEventListener('DOMContentLoaded', () => {

		const modalTimerId = setTimeout(() => opModal('.modal', modalTimerId), 5000);

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
	
		tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
		modal('[data-modal]', '.modal', modalTimerId);
		timer('.timer', '2022-11-20');
		cards();
		calc();
		forms('form', modalTimerId);
		slider({
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



		




 





