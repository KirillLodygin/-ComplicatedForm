import React, {createContext, useContext, useState} from "react";

const DataContext = createContext();

export  const useData = () => useContext(DataContext);

export const DataProvider = ({children}) => {
	const [data, setData] = useState({});
	const setValues = (values) => {
		setData((prevData) => ({
			...prevData,
			...values
		}));
	};

	return (
		<DataContext.Provider value={{data, setValues}}>
			{children}
		</DataContext.Provider>
	);
};