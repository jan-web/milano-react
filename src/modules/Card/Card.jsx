import { useDispatch } from 'react-redux';
import './card.scss';
import { addItemToCart } from '../../redux/cartSlice';
import { useState } from 'react';

export const Card = ({ id, img, title, dateDelivery, price }) => {
	const dispatch = useDispatch();

	const handlerAddToCard = () => {
		dispatch(addItemToCart({ productId: id, quantity: 1 }));
	};
	const [titleOnButton, setTitleOnButton] = useState(`${price}\u00A0₽`);

	const handleMouseEnter = () => {
		setTitleOnButton('в корзину');
	};
	const handleMouseLeave = () => {
		setTitleOnButton(`${price}\u00A0₽`);
	};

	return (
		<article className='goods__card card'>
			<img className='card__image' src={img} alt={title} />
			<div className='card__content'>
				<h3 className='card__title'>{title}</h3>
				<div className='card__footer'>
					<p className='card__date-delivery'>{dateDelivery}</p>
					<button
						className='card__button'
						onClick={handlerAddToCard}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						{titleOnButton}
					</button>
				</div>
			</div>
		</article>
	);
};
