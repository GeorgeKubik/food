
	import {clModal, opModal} from './modal';
	import {postData} from '../services/servisec';
	
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
	
				postData('http://localhost:3000/requests', json) // сюда отправили
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

			opModal('.modal', modalTimerId);

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
				clModal('.modal');
			}, 4000);
		}

		fetch('http://localhost:3000/menu')
			.then(data => data.json())
			.then(res => console.log(res));
	}

	/* module.exports = forms; */
	export {forms};


	