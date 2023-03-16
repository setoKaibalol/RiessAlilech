import React, {
	useState,
	createContext,
	useContext,
	Dispatch,
	SetStateAction,
	ReactNode,
} from "react"

type ActiveNumber = {
	active: number
	setActive: Dispatch<SetStateAction<number>>
}

export const Context = createContext<ActiveNumber>({} as ActiveNumber)

export const UserContext = ({ children }: { children: ReactNode }) => {
	const [active, setActive] = useState(0)

	return (
		<Context.Provider value={{ active, setActive }}>
			{children}
		</Context.Provider>
	)
}

export const useUserContext = () => useContext(Context)
