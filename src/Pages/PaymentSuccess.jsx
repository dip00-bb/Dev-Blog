import React, { useEffect, useState } from 'react';
import { CheckCircle, Copy, Check } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';
import axiosPublic from '../axios/useAxiosPublic';
import { toast } from 'react-toastify';

export default function PaymentSuccess() {
  const [copied, setCopied] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({})

  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");



  useEffect(() => {
    if (session_id) {
      axiosPublic.get(`/session/${session_id}`)
        .then((res) => setCustomerInfo(res?.data?.metadata))
        .catch((err) => toast.warn(err));
    }
  }, [session_id]);


  const handleCopy = () => {
    navigator.clipboard.writeText(session_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };



  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 blur-2xl opacity-30 rounded-full animate-pulse"></div>
            <CheckCircle className="relative w-20 h-20 text-green-500" strokeWidth={1.5} />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
            <p className="text-green-50 text-sm">Your transaction has been completed</p>
          </div>

          {/* Payment Details */}
          <div className="px-6 py-8 space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                Customer Name
              </label>
              <div className="bg-gray-900 rounded-lg px-4 py-3 border border-gray-700">
                <p className="text-white text-lg font-medium">{customerInfo.name}</p>
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                Amount Paid
              </label>
              <div className="bg-gray-900 rounded-lg px-4 py-3 border border-gray-700">
                <p className="text-green-400 text-2xl font-bold">{customerInfo.amountPaid}</p>
              </div>
            </div>

            {/* Session ID */}
            <div className="space-y-2">
              <label className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                Session ID
              </label>
              <div className="bg-gray-900 rounded-lg px-4 py-3 border border-gray-700 flex items-center justify-between gap-3">
                <p className="text-gray-300 text-sm font-mono break-all flex-1">
                  {session_id}
                </p>
                <button
                  onClick={handleCopy}
                  className="flex-shrink-0 p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  title="Copy Session ID"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirmation Message */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-4">
              <p className="text-gray-400 text-sm text-center">
                A confirmation email has been sent to your registered email address.
              </p>
            </div>

            {/* Action Button */}
            <Link to='/' className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-green-500/20 mt-4">
              Start Reading
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Need help? Contact our support team
        </p>
      </div>
    </div>
  );
}

