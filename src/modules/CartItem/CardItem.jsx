import { API_URL } from '../../const';

export const CardItem = ({ item }) => {
	return (
		<>
			<img className='cart__img' src={`${API_URL}${item.photoUrl}`} alt={item.name} />
			<h4 className='cart__item-title'>{item.name}</h4>
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
