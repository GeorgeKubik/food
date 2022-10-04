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
	export {modal};
	export {clModal};
	export {opModal};