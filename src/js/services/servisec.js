
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

	export {postData};
	export {getResource};