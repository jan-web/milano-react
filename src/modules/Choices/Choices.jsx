import classNames from 'classnames';
import './choices.scss';


export const Choices = ({ children, buttonLabel, className, isOpen }) => {


  const handleToggle = () => {
    
  }

	return (
		<div className={classNames('choices', className)}>
			<button className='choices__btn' type='button' onClick={handleToggle}>
				{buttonLabel}
			</button>

			{isOpen && <div className='choices__box'>{children}</div>}
		</div>
	);
};
