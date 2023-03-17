import React, {
	useState,
	createContext,
	useContext,
	Dispatch,
	SetStateAction,
	ReactNode,
} from "react"

type GlobalStates = {
	active: number
	setActive: Dispatch<SetStateAction<number>>
	refreshItems: boolean
	setRefreshItems: Dispatch<SetStateAction<boolean>>
	refreshAuctions: boolean
	setRefreshAuctions: Dispatch<SetStateAction<boolean>>
	items: any[]
	setItems: Dispatch<SetStateAction<never[]>>
	auctions: any[]
	setAuctions: Dispatch<SetStateAction<never[]>>
}

export const Context = createContext<GlobalStates>({} as GlobalStates)

export const UserContext = ({ children }: { children: ReactNode }) => {
	const [active, setActive] = useState(1)

	const [items, setItems] = useState([])
	const [refreshItems, setRefreshItems] = useState(false)
	const [auctions, setAuctions] = useState([])
	const [refreshAuctions, setRefreshAuctions] = useState(false)

	return (
		<Context.Provider
			value={{
				active,
				setActive,
				refreshItems,
				setRefreshItems,
				refreshAuctions,
				setRefreshAuctions,
				items,
				setItems,
				auctions,
				setAuctions,
			}}>
			{children}
		</Context.Provider>
	)
}

export const useUserContext = () => useContext(Context)
