import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Contact } from "lucide-react";
const NotConnect = () => {
    return (
        <div className="text-center w-full">
            <h1 className="text-2xl font-bold mb-4">Welcome to Blockchain Bank</h1>
            <p className="text-gray-600 mb-4">Please connect your wallet to continue</p>
            <Alert className="flex flex-row items-center mt-4">
                <Contact className="h-5 w-5 mr-2" />
                <div>
                    <AlertTitle>You are not connected!</AlertTitle>
                    <AlertDescription>Connect your wallet to access your account</AlertDescription>
                </div>
            </Alert>
        </div>
    )
}

export default NotConnect