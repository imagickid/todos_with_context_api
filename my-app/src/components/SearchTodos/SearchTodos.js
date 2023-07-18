import { useContext } from "react";
import { AppContext } from "../../Contexts";
import styles from './SearchTodos.module.css'

const SearchTodos = () => {
	
	const {searchInput, setSearchInput} = useContext(AppContext)

	return (
		<input
			type="text"
			className={styles.searchBar}
			placeholder="Search Todos"
			value={searchInput}
			onChange={(e) => setSearchInput(e.target.value)}
		/>
	);
};

export default SearchTodos