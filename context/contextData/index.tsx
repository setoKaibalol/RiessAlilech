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
	refreshCreatorAuctions: boolean
	setRefreshCreatorAuctions: Dispatch<SetStateAction<boolean>>
	items: any[]
	setItems: Dispatch<SetStateAction<never[]>>
	auctions: any[]
	setAuctions: Dispatch<SetStateAction<never[]>>
	creatorAuctions: any[]
	setCreatorAuctions: Dispatch<SetStateAction<never[]>>
	itemStatus: string
	setItemStatus: Dispatch<SetStateAction<string>>
	auctionsStatus: string
	setAuctionsStatus: Dispatch<SetStateAction<string>>
	creatorAuctionsStatus: string
	setCreatorAuctionsStatus: Dispatch<SetStateAction<string>>
	creators: any[]
	setCreators: Dispatch<SetStateAction<never[]>>
	creatorsStatus: string
	setCreatorsStatus: Dispatch<SetStateAction<string>>
	refreshCreators: boolean
	setRefreshCreators: Dispatch<SetStateAction<boolean>>
	adminCreators: any[]
	setAdminCreators: Dispatch<SetStateAction<never[]>>
	adminCreatorsStatus: string
	setAdminCreatorsStatus: Dispatch<SetStateAction<string>>
	refreshAdminCreators: boolean
	setRefreshAdminCreators: Dispatch<SetStateAction<boolean>>
	adminUsers: any[]
	setAdminUsers: Dispatch<SetStateAction<never[]>>
	adminUsersStatus: string
	setAdminUsersStatus: Dispatch<SetStateAction<string>>
	refreshAdminUsers: boolean
	setRefreshAdminUsers: Dispatch<SetStateAction<boolean>>
	userAuctions: any[]
	setUserAuctions: Dispatch<SetStateAction<never[]>>
	userAuctionsStatus: string
	setUserAuctionsStatus: Dispatch<SetStateAction<string>>
	refreshUserAuctions: boolean
	setRefreshUserAuctions: Dispatch<SetStateAction<boolean>>
	userItems: any[]
	setUserItems: Dispatch<SetStateAction<never[]>>
	userItemsStatus: string
	setUserItemsStatus: Dispatch<SetStateAction<string>>
	refreshUserItems: boolean
	setRefreshUserItems: Dispatch<SetStateAction<boolean>>
}

export const Context = createContext<GlobalStates>({} as GlobalStates)

export const UserContext = ({ children }: { children: ReactNode }) => {
	const [active, setActive] = useState(1)

	const [items, setItems] = useState([])
	const [refreshItems, setRefreshItems] = useState(false)
	const [itemStatus, setItemStatus] = useState("loading")
	const [userItems, setUserItems] = useState([])
	const [userItemsStatus, setUserItemsStatus] = useState("loading")
	const [refreshUserItems, setRefreshUserItems] = useState(false)
	const [auctions, setAuctions] = useState([])
	const [creatorAuctions, setCreatorAuctions] = useState([])
	const [refreshCreatorAuctions, setRefreshCreatorAuctions] = useState(false)
	const [refreshAuctions, setRefreshAuctions] = useState(false)
	const [auctionsStatus, setAuctionsStatus] = useState("loading")
	const [creatorAuctionsStatus, setCreatorAuctionsStatus] = useState("loading")
	const [creators, setCreators] = useState([])
	const [creatorsStatus, setCreatorsStatus] = useState("loading")
	const [refreshCreators, setRefreshCreators] = useState(false)
	const [adminCreators, setAdminCreators] = useState([])
	const [adminCreatorsStatus, setAdminCreatorsStatus] = useState("loading")
	const [refreshAdminCreators, setRefreshAdminCreators] = useState(false)
	const [adminUsers, setAdminUsers] = useState([])
	const [adminUsersStatus, setAdminUsersStatus] = useState("loading")
	const [refreshAdminUsers, setRefreshAdminUsers] = useState(false)
	const [userAuctions, setUserAuctions] = useState([])
	const [userAuctionsStatus, setUserAuctionsStatus] = useState("loading")
	const [refreshUserAuctions, setRefreshUserAuctions] = useState(false)

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
				itemStatus,
				setItemStatus,
				auctionsStatus,
				setAuctionsStatus,
				creatorAuctions,
				setCreatorAuctions,
				refreshCreatorAuctions,
				setRefreshCreatorAuctions,
				creatorAuctionsStatus,
				setCreatorAuctionsStatus,
				creators,
				setCreators,
				creatorsStatus,
				setCreatorsStatus,
				refreshCreators,
				setRefreshCreators,
				adminCreators,
				setAdminCreators,
				adminCreatorsStatus,
				setAdminCreatorsStatus,
				refreshAdminCreators,
				setRefreshAdminCreators,
				adminUsers,
				setAdminUsers,
				adminUsersStatus,
				setAdminUsersStatus,
				refreshAdminUsers,
				setRefreshAdminUsers,
				userAuctions,
				setUserAuctions,
				userAuctionsStatus,
				setUserAuctionsStatus,
				refreshUserAuctions,
				setRefreshUserAuctions,
				userItems,
				setUserItems,
				userItemsStatus,
				setUserItemsStatus,
				refreshUserItems,
				setRefreshUserItems,
			}}>
			{children}
		</Context.Provider>
	)
}

export const useUserContext = () => useContext(Context)
