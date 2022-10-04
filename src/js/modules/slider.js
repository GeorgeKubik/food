
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
	export {slider};