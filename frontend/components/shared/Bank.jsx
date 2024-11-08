'use client';

import { contractABI, contractAddress } from "@/constants"
import { useReadContract, useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { useEffect, useState } from "react"
import { parseEther, formatEther } from 'viem'
import { publicClient } from "@/utils/client"
import { Input } from "../ui/input"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { RocketIcon } from "lucide-react"

const Bank = () => {
    const { address } = useAccount()

    const [amountToDeposit, setAmountToDeposit] = useState(0)
    const [amountToWithdraw, setAmountToWithdraw] = useState(0)
    const [balance, setBalance] = useState(null)
    const [depositEvent, setDepositEvent] = useState(null)
    const [withdrawEvent, setWithdrawEvent] = useState(null)

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
            setDepositEvent(Date.now())  // Trigger balance update after deposit
        } catch (error) {
            console.error('Error during deposit:', error.message)
        }
    }

    // Withdraw function
    const withdraw = async () => {
        // try {
        //     writeContract({
        //         abi: contractABI,
        //         address: contractAddress,
        //         functionName: 'withdraw',
        //         args: [parseEther(amountToWithdraw)],
        //     })
        //     setWithdrawEvent(Date.now())  // Trigger balance update after withdrawal
        // } catch (error) {
        //     console.error('Error during withdrawal:', error.message)
        // }
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
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

            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Deposit</h2>
                <div className="flex flex-col space-y-4">
                    {transactionHash && (
                        <Alert className="bg-green-100 border-green-400 text-green-700" role="alert">
                            <RocketIcon className="w-6 h-6 mr-2" />
                            <AlertTitle>Information</AlertTitle>
                            <AlertDescription>
                                Transaction Hash : {transactionHash}
                            </AlertDescription>
                        </Alert>
                    )}
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

            <div className="bg-white shadow-md rounded-lg p-6">
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

            <div className="bg-white shadow-md rounded-lg p-6 mt-8">
                <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-lg text-gray-700">Deposit</p>
                        <p className="text-lg text-gray-700">+5 ETH</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-lg text-gray-700">Withdraw</p>
                        <p className="text-lg text-gray-700">-2 ETH</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bank
