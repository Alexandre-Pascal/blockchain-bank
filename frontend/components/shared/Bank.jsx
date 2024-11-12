'use client';

import { contractABI, contractAddress } from "@/constants"
import { useReadContract, useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { useEffect, useState } from "react"
import { parseEther, formatEther, parseAbi } from 'viem'
import { publicClient } from "@/utils/client"
import { Input } from "../ui/input"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { RocketIcon } from "lucide-react"

const Bank = () => {
    const { address } = useAccount()

    const [amountToDeposit, setAmountToDeposit] = useState(0)
    const [amountToWithdraw, setAmountToWithdraw] = useState(0)
    const [balance, setBalance] = useState(null)
    const [withdrawEvents, setWithdrawEvents] = useState([])
    const [depositEvents, setDepositEvents] = useState([])

    const { isLoading, isError, error } = useReadContract({
        abi: contractABI,
        address: contractAddress,
        functionName: 'balances',
        args: [address],
    })

    // Call to read the balance initially or after transactions
    const fetchBalance = async () => {
        console.log('Fetching balance...')
        try {
            if (address) {
                const balance = await publicClient.readContract({
                    abi: contractABI,
                    address: contractAddress,
                    functionName: 'balances',
                    args: [address],
                })
                setBalance(formatEther(balance.toString()))
            }
        } catch (err) {
            console.error("Error fetching balance:", err)
        }
    }

    const { writeContract, data: transactionHash, isPending } = useWriteContract()

    const { isSuccess } = useWaitForTransactionReceipt({
        hash: transactionHash,
        onSuccess: () => {
            // After transaction is confirmed, update the balance
            fetchBalance()
        },
    })


    // Effect to update balance whenever address changes or transaction completes
    useEffect(() => {
        fetchBalance()
        getEvents();

    }, [transactionHash])


    // Deposit function
    const deposit = async () => {
        try {
            writeContract({
                abi: contractABI,
                address: contractAddress,
                functionName: 'deposit',
                value: parseEther(amountToDeposit),
            })
        } catch (error) {
            console.error('Error during deposit:', error.message)
        }
    }

    // Withdraw function
    const withdraw = async () => {
        console.log('Withdrawing...', parseEther(amountToWithdraw))
        try {
            writeContract({
                abi: contractABI,
                address: contractAddress,
                functionName: 'withdraw',
                args: [parseEther(amountToWithdraw)],
            })
        } catch (error) {
            console.error('Error during withdrawal:', error.message)
        }
    }


    const getEvents = async () => {
        console.log('Fetching events...')

        const numberChangedLog = await publicClient.getLogs({
            address: contractAddress,
            events: parseAbi([
                'event Deposit(address indexed from, uint amount)',
                'event Withdraw(address indexed to, uint amount)'
            ]),
            fromBlock: 0n,
            toBlock: 'latest'
        })

        console.log('Fetched events:', numberChangedLog)

        // Création de listes temporaires
        const tempWithdrawEvents = [...withdrawEvents]
        const tempDepositEvents = [...depositEvents]

        numberChangedLog.forEach(log => {
            const transactionHash = log.transactionHash

            // Vérification des doublons
            const isDuplicateWithdraw = tempWithdrawEvents.some(event => event.transactionHash === transactionHash)
            const isDuplicateDeposit = tempDepositEvents.some(event => event.transactionHash === transactionHash)

            // Ajout de l'événement si ce n'est pas un doublon
            if (log.eventName === "Deposit" && !isDuplicateDeposit) {
                tempDepositEvents.push({
                    type: log.eventName,
                    address: log.args.from?.toString(),
                    amount: log.args.amount.toString(),
                    transactionHash: transactionHash,
                })
            } else if (log.eventName === "Withdraw" && !isDuplicateWithdraw) {
                tempWithdrawEvents.push({
                    type: log.eventName,
                    address: log.args.to?.toString(),
                    amount: log.args.amount.toString(),
                    transactionHash: transactionHash,
                })
            }
        })

        // Mise à jour de l'état avec les listes filtrées
        setWithdrawEvents(tempWithdrawEvents)
        setDepositEvents(tempDepositEvents)
    }

    // Lorsque l'on a qqn qui est connecté, on fetch les events
    useEffect(() => {
        const getAllEvents = async () => {
            if (address !== 'undefined') {
                console.log('Fetching events...')
                await getEvents();
            }
        }
        getAllEvents()
    }, [address])
    return (
        <>
            <div className="bg-white shadow-md rounded-lg p-6 mb-8 w-full max-w-2xl">
                <h2 className="text-2xl font-semibold mb-4">Your Balance In The Bank</h2>
                {isLoading ? (
                    <p className="text-lg text-gray-500">Loading balance...</p>
                ) : isError ? (
                    <div className="text-red-500">
                        <p>Error loading balance: {error?.message}</p>
                    </div>
                ) : (
                    <p className="text-lg text-gray-700">You own {balance ? balance : '0'} ETH</p>
                )}
            </div>

            {transactionHash && (
                <Alert className="bg-green-100 border-green-400 text-green-700 mb-4 w-full max-w-2xl" role="alert">
                    <RocketIcon className="w-6 h-6 mr-2" />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>
                        Transaction Hash : {transactionHash}
                    </AlertDescription>
                </Alert>
            )}

            <div className="bg-white shadow-md rounded-lg p-6 mb-8 w-full max-w-2xl">
                <h2 className="text-2xl font-semibold mb-4">Deposit</h2>
                <div className="flex flex-col space-y-4">
                    <Input
                        placeholder="Amount"
                        type="number"
                        value={amountToDeposit}
                        onChange={(e) => setAmountToDeposit(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg"
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                        onClick={deposit}
                        disabled={isPending}
                    >
                        Deposit
                    </button>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
                <h2 className="text-2xl font-semibold mb-4">Withdraw</h2>
                <div className="flex flex-col space-y-4">
                    <Input
                        placeholder="Amount"
                        type="number"
                        value={amountToWithdraw}
                        onChange={(e) => setAmountToWithdraw(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg"
                    />
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                        onClick={withdraw}
                        disabled={isPending}
                    >
                        Withdraw
                    </button>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 mt-8 w-full max-w-2xl">
                <h2 className="text-2xl font-semibold mb-4">Transactions Deposit</h2>
                <div className="flex flex-col space-y-4">
                    {depositEvents.map((event, index) => (
                        <div key={index} className="flex justify-between">
                            <p className="ml-2">From: <span className="font-bold">{event.address}</span></p>
                            <p className='ml-2 mr-2'>|</p>
                            <p>Amount : <span className="font-bold">{formatEther(event.amount)} ETH</span></p>
                        </div>
                    ))}
                </div>
            </div >

            <div className="bg-white shadow-md rounded-lg p-6 mt-8 w-full max-w-2xl">
                <h2 className="text-2xl font-semibold mb-4">Transactions Withdraw</h2>
                <div className="flex flex-col space-y-4">
                    {withdrawEvents.map((event, index) => (
                        <div key={index} className="flex justify-between">
                            <p className="ml-2">To: <span className="font-bold">{event.address}</span></p>
                            <p className='ml-2 mr-2'>|</p>
                            <p>Amount : <span className="font-bold">{formatEther(event.amount)} ETH</span></p>
                        </div>
                    ))}
                </div>
            </div >
        </>
    )
}

export default Bank
