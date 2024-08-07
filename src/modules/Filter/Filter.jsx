import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePrice, changeType } from '../../redux/filtersSlice';
import { fetchGoods } from '../../redux/goodsSlice';
import { debounce, getValidFilters } from '../../utils';
import { Choices } from '../Choices/Choices';
import './filter.scss';
import { FilterRadio } from './FilterRadio';

const filterTypes = [
	{ value: 'bouquets', title: 'Цветы' },
	{ value: 'toys', title: 'Игрушки' },
	{ value: 'postcards', title: 'Открытки' },
];

export const Filter = ({setTitleGoods}) => {
	const dispatch = useDispatch();
	const [openChoice, setOpenChoice] = useState(null);
	const statusGoods = useSelector(state => state.goods.status);
	const filters = useSelector(state => state.filters);

	const prevFiltersRef = useRef({});

	const debouncedFetchGoods = useRef(
		debounce(filters => {
			const validFilter = getValidFilters(filters);
			dispatch(fetchGoods(validFilter));
		}, 1000)
	).current;

	useEffect(() => {
		const prevFilters = prevFiltersRef.current;
		const validFilter = getValidFilters(filters);
		if(!validFilter.type) {
			return;
		}
		if (prevFilters.type !== filters.type || statusGoods === 'idle') {
			dispatch(fetchGoods(validFilter));
			setTitleGoods(filterTypes.find((items) => items.value === filters.type). title);
		} else {
			debouncedFetchGoods(validFilter);
		}
		prevFiltersRef.current = filters;
	}, [setTitleGoods, dispatch, debouncedFetchGoods, filters]);

	const handleTypeChange = ({ target }) => {
		const { value } = target;
		dispatch(changeType(value));
		setOpenChoice(null);

	};

	const handlePriceChange = ({ target }) => {
		const { name, value } = target;
		dispatch(changePrice({name, value}));
	};

	const handleChoicesToggle = index => {
		setOpenChoice(openChoice === index ? null : index);
	};

	return (
		<section className='filter'>
			<h2 className='visually-hidden'></h2>
			<div className='container'>
				<form className='filter__form'>
					<fieldset className='filter__group'>
						{filterTypes.map(item => (
							<FilterRadio
								key={item.value}
								handleTypeChange={handleTypeChange}
								data={item}
								type={filters.type}
							/>
						))}
					</fieldset>

					<fieldset className='filter__group filter__group_choices'>
						<Choices
							buttonLabel='Цена'
							isOpen={openChoice === 0}
							onToggle={() => handleChoicesToggle(0)}
						>
							<fieldset className='filter__price'>
								<input
									className='filter__input-price'
									type='text'
									name='minPrice'
									placeholder='от'
									value={filters.minPrice}
									onChange={handlePriceChange}
								/>
								<input
									className='filter__input-price'
									type='text'
									name='maxPrice'
									placeholder='до'
									value={filters.maxPrice}
									onChange={handlePriceChange}
								/>
							</fieldset>
						</Choices>

						<Choices
							buttonLabel='Тип товара'
							isOpen={openChoice === 1}
							onToggle={() => handleChoicesToggle(1)}
						>
							<ul className='filter__type-list'>
								<li className='filter__type-item'>
									<button className='filter__type-button' type='button'>
										Монобукеты
									</button>
								</li>
								<li className='filter__type-item'>
									<button className='filter__type-button' type='button'>
										Авторские букеты
									</button>
								</li>
								<li className='filter__type-item'>
									<button className='filter__type-button' type='button'>
										Цветы в коробке
									</button>
								</li>
								<li className='filter__type-item'>
									<button className='filter__type-button' type='button'>
										Цветы в корзине
									</button>
								</li>
								<li className='filter__type-item'>
									<button className='filter__type-button' type='button'>
										Букеты из сухоцветов
									</button>
								</li>
							</ul>
						</Choices>
					</fieldset>
				</form>
			</div>
		</section>
	);
};
