import './goods.scss';

import { Cart } from '../Cart/Cart';
import { Card } from '../Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from '../../redux/goodsSlice';
import { useEffect } from 'react';

export const Goods = () => {
	const dispatch = useDispatch();
	const { items: goods, status:  goodsStatus, error} = useSelector(state => state.goods);

	useEffect(() => {
		if(goodsStatus === 'idle') {
			dispatch(fetchGoods());
		}
	}, [dispatch, goodsStatus]);

	return (
		<section className='goods'>
			<div className='container goods__container'>
				<div className='goods__box'>
					<h2 className='goods__title'>Цветы</h2>

					<ul className='goods__list'>
						{goods.map(item => (
							<li className='goods__item' key={item.id}>
								<Card {...item} />
							</li>
						))}
					</ul>
				</div>

				<Cart />
			</div>
		</section>
	);
};
