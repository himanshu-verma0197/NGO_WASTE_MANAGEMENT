import React from "react";
import { User, Shield } from "lucide-react";

const LoginScreen = ({ setCurrentScreen }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 p-4 rounded-full">
                        <Shield className="h-8 w-8 text-green-600" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-2">EcoReport</h1>
                <p className="text-gray-500 mb-8">Waste Management System</p>

                {/* User Login */}
                <button
                    onClick={() => setCurrentScreen("userLogin")}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
          text-white font-semibold py-4 px-6 rounded-xl transition transform hover:scale-105 flex items-center justify-center gap-2 mb-4"
                >
                    <User className="h-5 w-5" />
                    Login as User
                </button>

                {/* Admin Login */}
                <button
                    onClick={() => setCurrentScreen("adminLogin")}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
          text-white font-semibold py-4 px-6 rounded-xl transition transform hover:scale-105 flex items-center justify-center gap-2"
                >
                    <Shield className="h-5 w-5" />
                    Login as NGO Admin
                </button>

                <p className="text-sm text-gray-500 mt-6">
                    Join the movement to keep our environment clean
                </p>

                <div className="mt-4 text-gray-600 text-sm">
                    <p>
                        Don’t have an account?{" "}
                        <button
                            type="button"
                            onClick={() => setCurrentScreen("signup")}
                            className="text-blue-600 hover:underline font-semibold"
                        >
                            Create one here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
