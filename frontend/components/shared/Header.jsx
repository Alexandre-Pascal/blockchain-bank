import { ConnectButton } from "@rainbow-me/rainbowkit"

function Header() {
    return (
        <nav className="flex justify-between items-center py-4">
            <div>
                <h1 className="ml-4 text-2xl font-bold">BlockChain Bank Logo</h1>
            </div>
            <div className="mr-4">
                <ConnectButton />
            </div>
        </nav>
    )
}

export default Header
