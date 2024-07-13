import './goods.scss';

import { Cart } from '../Cart/Cart';
import { Card } from '../Card/Card';
import { useSelector } from 'react-redux';

import { API_URL } from '../../const';
import { useEffect, useRef } from 'react';

export const Goods = ({title, setGoodsRef}) => {
	const goodsRef = useRef(null);

	const {
		items: goods,
		status: goodsStatus,
		error,
	} = useSelector(state => state.goods);

useEffect(()=> {
	setGoodsRef(goodsRef);
}, [])

	let content = null;

	if (goodsStatus === 'loading') {
		content = <p>Loading...</p>;
	}
	if (goodsStatus === 'success' && goods.length) {
		content = (
			<ul className='goods__list' ref={goodsRef}>
				{goods.map(item => (
					<li key={item.id} className='goods__item'>
						<Card
							className='goods__card'
							id={item.id}
							img={`${API_URL}${item.photoUrl}`}
							title={item.name}
							dateDelivery='сегодня в 14:00'
							price={item.price}
						/>
					</li>
				))}
			</ul>
		);
	}

	if (!goods.length) {
		content = <p>Оформленный раздел - По вашему запросу ничего не найдено</p>;
	}
	if (goodsStatus === 'failed') {
		content = <p>{error}</p>;
	}

	return (
		<section className='goods'>
			<div className='container goods__container'>
				<div className='goods__box'>
					<h2 className='goods__title'>{title}</h2>
					{content}
				</div>

				<Cart />
			</div>
		</section>
	);
};
