import { useDispatch } from 'react-redux';
import { decreaseItemQuantity, deleteItem, increaseItemQuantity } from '../../store/cart/cartSlice';

export default function UpdateItemQuantity({ pizzaId, currentQuantity }) {
	const dispatch = useDispatch();

	return (
		<div className="flex items-center gap-2 rounded-full border px-3 sm:gap-3">
			{currentQuantity === 1 ? (
				<button onClick={() => dispatch(deleteItem(pizzaId))} className="btn p-[5px] text-xs focus:ring-0 focus:ring-offset-0 sm:p-[7px]">
					🗑️
				</button>
			) : (
				<button onClick={() => dispatch(decreaseItemQuantity(pizzaId))} className="btn p-[5px] text-sm focus:ring-0 focus:ring-offset-0 sm:p-[7px]">
					-
				</button>
			)}

			<span className="text-sm">{currentQuantity}</span>

			<button onClick={() => dispatch(increaseItemQuantity(pizzaId))} className="btn p-[5px] text-sm focus:ring-0 focus:ring-offset-0 sm:p-[7px]">
				+
			</button>
		</div>
	);
}
