import { useEffect, useRef, useState } from 'react';
import { Choices } from '../Choices/Choices';
import './filter.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from '../../redux/goodsSlice';
import { debounce, getValidFilters } from '../../utils';
import { updateFilter } from '../../redux/filterSlice';

export const Filter = () => {
	const dispatch = useDispatch();
	const [openChoice, setOpenChoice] = useState(null);
	const statusGoods = useSelector(state => state.goods.status);
	const filtersRedux = useSelector(state => state.filters.filter);


	const prevFiltersRef = useRef({});

	const debouncedFetchGoods = useRef(debounce(filtersRedux => {
		const validFilter = getValidFilters(filtersRedux);
		dispatch(fetchGoods(validFilter));
	}, 1000),
).current;

	useEffect(() =>{
		const prevFilters = prevFiltersRef.current;
		const validFilter = getValidFilters(filtersRedux);
		if(prevFilters.type !== filtersRedux.type || statusGoods === 'idle') {
			dispatch(fetchGoods(validFilter));
		} else {
					debouncedFetchGoods(filtersRedux);
		}
		prevFiltersRef.current = filtersRedux;
	}, [dispatch, debouncedFetchGoods, filtersRedux]);

	const handleTypeChange = ({target}) => {
		const  {value} = target;
		const newFilters = {...filtersRedux, type: value, minPrice: '', maxPrice: ''};
		setOpenChoice(null);

		dispatch(updateFilter(newFilters));
	}

	const handlePriceChange = ({target}) => {
		const  {name, value} = target;
		const newFilters = {...filtersRedux, [name]: !isNaN(parseInt(value, 10)) ? value : ''};

		dispatch(updateFilter(newFilters));
	}

	const handleChoicesToggle = (index) => {
		setOpenChoice(openChoice === index ? null : index);
	};



	return (
		<section className='filter'>
			<h2 className='visually-hidden'></h2>
			<div className='container'>
				<form className='filter__form'>
					<fieldset className='filter__group'>
						<input
							className='filter__radio'
							type='radio'
							name='type'
							value='bouquets'
							id='flower'
							checked={filtersRedux.type === 'bouquets'}
							onChange={handleTypeChange}
						/>
						<label
							className='filter__label filter__label_flower'
							htmlFor='flower'
						>
							Цветы
						</label>

						<input
							className='filter__radio'
							type='radio'
							name='type'
							value='toys'
							id='toys'
							checked={filtersRedux.type === 'toys'}
							onChange={handleTypeChange}
						/>
						<label className='filter__label filter__label_toys' htmlFor='toys'>
							Игрушки
						</label>

						<input
							className='filter__radio'
							type='radio'
							name='type'
							value='postcards'
							id='postcard'
							checked={filtersRedux.type === 'postcard'}
							onChange={handleTypeChange}
						/>
						<label
							className='filter__label filter__label_postcard'
							htmlFor='postcard'
						>
							Открытки
						</label>
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
									value={filtersRedux.minPrice}
									onChange={handlePriceChange}
								/>
								<input
									className='filter__input-price'
									type='text'
									name='maxPrice'
									placeholder='до'
									value={filtersRedux.maxPrice}
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
