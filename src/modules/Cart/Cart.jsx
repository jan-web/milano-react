import './cart.scss';
import { goodsArray } from '../../goodsArray';
import { CardItem } from '../CartItem/CardItem';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../../redux/cartSlice';
import { openModal } from '../../redux/orderSlice';
import { useEffect, useRef, useState } from 'react';

export const Cart = () => {
	const dispatch = useDispatch();
	const isOpen = useSelector(state => state.cart.isOpen);
	const items = useSelector(state => state.cart.items);
	const [priceTotal, setPriceTotal] = useState(0);

	useEffect(() => {
		if (items) {
			const total = items.reduce((result, element) => {
				return result + element.price;
			}, 0);

			setPriceTotal(total);
		}
	}, [items]);

	const cartRef = useRef(null);

	const handlerCartClose = () => {
		dispatch(toggleCart());
	};
	const handlerOrderOpen = () => {
		dispatch(openModal());
	};

	useEffect(() => {
		if (isOpen) {
			cartRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<section className='cart cart_open' ref={cartRef}>
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
					{items.map(item => (
						<li className='cart__item' key={item.id}>
							<CardItem item={item} />
						</li>
					))}
				</ul>

				<div className='cart__footer'>
					<button className='cart__order-btn' onClick={handlerOrderOpen}>
						Оформить
					</button>
					<p className='cart__price cart__price_total'>{priceTotal}&nbsp;₽</p>
				</div>
			</div>
		</section>
	);
};
