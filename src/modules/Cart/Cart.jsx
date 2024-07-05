import './cart.scss';
import { goodsArray } from '../../goodsArray';
import { CardItem } from '../CartItem/CardItem';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, toggleCart } from '../../redux/cartSlice';

export const Cart = () => {
	const isOpen = useSelector((state) => state.cart.isOpen);
	const dispatch = useDispatch();
	const handlerCartClose = () => {
		dispatch(toggleCart());
	}
	const handlerModalOpen = () => {
		dispatch(openModal());
	}
	if (!isOpen) return null;

	return (
		<section className='cart cart_open'>
			<div className='cart__container'>
				<div className='cart__header'>
					<h3 className='cart__title'>Ваш заказ</h3>

					<button className='cart__close'>
						<svg
							width='28'
							height='28'
							viewBox='0 0 28 28'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							onClick={handlerCartClose}
						>
							<rect
								x='5'
								y='5.70715'
								width='1'
								height='25'
								transform='rotate(-45 5 5.70715)'
								fill='#D17D2F'
							/>
							<rect
								x='22.6777'
								y='5'
								width='1'
								height='25'
								transform='rotate(45 22.6777 5)'
								fill='#D17D2F'
							/>
						</svg>
					</button>
				</div>

				<p className='cart__date-delivery'>сегодня в 14:00</p>

				<ul className='cart__list'>
					{goodsArray.slice(0, 3).map(item => (
						<li className='cart__item' key={item.id}>
							<CardItem item={item} />
						</li>
					))}
				</ul>

				<div className='cart__footer'>
					<button className='cart__order-btn' onClick={handlerModalOpen}>Оформить</button>
					<p className='cart__price cart__price_total'>0&nbsp;₽</p>
				</div>
			</div>
		</section>
	);
};
