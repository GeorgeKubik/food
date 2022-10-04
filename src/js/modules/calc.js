
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
	export {calc};