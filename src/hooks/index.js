import { useEffect } from 'react';

// Custom hook for handling adding project input
const useOutsideClick = (ref, callback) => {
	const handleClick = (e) => {
		if (ref.current && !ref.current.contains(e.target)) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClick);

		if (ref.current) {
			ref.current.focus();
		}

		return () => {
			document.removeEventListener('click', handleClick);
		};
	});
};

export default useOutsideClick;
