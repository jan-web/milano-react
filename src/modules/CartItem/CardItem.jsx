export const CardItem = ({ item }) => {
	return (
		<>
			<img className='cart__img' src={item.img} alt={item.title} />
			<h4 className='cart__item-title'>{item.title}</h4>
			<div className='cart__counter'>
				<button className='cart__counter-btn'>-</button>
				<input
					className='cart__counter-input'
					type='number'
					max='99'
					min='0'
					value='1'
				/>
				<button className='cart__counter-btn'>+</button>
			</div>
			<p className='cart__price'>{item.price}&nbsp;₽</p>
		</>
	);
};
