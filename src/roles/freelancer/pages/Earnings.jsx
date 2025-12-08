
import React, { useState, useEffect } from 'react'
import { Sidebar } from '../../../shared/components/Sidebar'
import { BottomNav } from '../../../shared/components/BottomNav'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import { useUser } from '../../../context/UserContext'
import { fetchTransactions, withdrawFunds } from '../../../services/api'
import { FiDollarSign, FiClock, FiArrowUpRight, FiArrowDownLeft, FiCreditCard, FiLock } from 'react-icons/fi'
import { toast } from 'react-toastify'

export default function Earnings() {
  const { currentUser } = useUser()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Modal States
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false)
  
  // Form States
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [selectedMethod, setSelectedMethod] = useState('')
  const [otp, setOtp] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  // Mock Payment Methods
  const paymentMethods = [
    { id: '1', name: 'GCash', details: '0917-***-4567' },
    { id: '2', name: 'BDO', details: '****-****-9012' },
  ]

  useEffect(() => {
    loadTransactions()
  }, [currentUser])

  const loadTransactions = async () => {
    try {
      const data = await fetchTransactions(currentUser?.id)
      setTransactions(data)
    } catch (error) {
      console.error('Failed to load transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInitiateWithdraw = (e) => {
    e.preventDefault()
    if (!withdrawAmount || !selectedMethod) {
      toast.error('Please fill in all fields')
      return
    }
    // Close withdraw modal and open OTP modal
    setShowWithdrawModal(false)
    setShowOtpModal(true)
    toast.info('OTP code sent to your email')
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP')
      return
    }

    setIsVerifying(true)
    try {
      // Simulate API call for OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const method = paymentMethods.find(m => m.id === selectedMethod)
      await withdrawFunds(currentUser?.id, parseFloat(withdrawAmount), method)
      
      toast.success('Withdrawal request submitted successfully!')
      setShowOtpModal(false)
      setWithdrawAmount('')
      setSelectedMethod('')
      setOtp('')
      loadTransactions()
    } catch (error) {
      toast.error('Failed to process withdrawal')
    } finally {
      setIsVerifying(false)
    }
  }

  // Calculate Balance
  const totalEarned = transactions
    .filter(t => t.type === 'earning' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)
    
  const totalWithdrawn = transactions
    .filter(t => t.type === 'withdrawal' && t.status === 'completed')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const pendingClearance = transactions
    .filter(t => t.type === 'earning' && t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0)

  const availableBalance = totalEarned - totalWithdrawn

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="freelancer" />

      <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="font-caveat text-4xl font-bold text-black mb-2">Earnings</h1>
            <p className="font-poppins text-gray-600">Track your income and withdrawals services</p>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <RoundedCard className="p-6 !bg-black text-white">
              <p className="font-poppins text-sm opacity-80 mb-1 text-white">Available Balance</p>
              <h2 className="font-caveat text-4xl font-bold mb-4 text-white">₱{availableBalance.toLocaleString()}</h2>
              <button 
                onClick={() => setShowWithdrawModal(true)}
                className="w-full py-2 bg-white text-black font-poppins text-sm font-medium rounded-[8px] hover:bg-gray-100 transition-colors"
              >
                Withdraw Funds
              </button>
            </RoundedCard>

            <RoundedCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-50 rounded-full">
                  <FiArrowDownLeft className="w-6 h-6 text-green-600" />
                </div>
                <span className="font-poppins text-xs text-gray-500">Lifetime</span>
              </div>
              <p className="font-poppins text-sm text-gray-500 mb-1">Total Earned</p>
              <h2 className="font-caveat text-3xl font-bold text-black">₱{totalEarned.toLocaleString()}</h2>
            </RoundedCard>

            <RoundedCard className="p-6">
               <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-50 rounded-full">
                  <FiClock className="w-6 h-6 text-orange-600" />
                </div>
                <span className="font-poppins text-xs text-gray-500">Processing</span>
              </div>
              <p className="font-poppins text-sm text-gray-500 mb-1">Pending Clearance</p>
              <h2 className="font-caveat text-3xl font-bold text-gray-800">₱{pendingClearance.toLocaleString()}</h2>
            </RoundedCard>
          </div>

          {/* Transactions */}
          <RoundedCard className="p-6">
            <h3 className="font-caveat text-2xl font-bold text-black mb-6">Recent Transactions</h3>
            {loading ? (
               <div className="text-center py-8">Loading...</div>
            ) : transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((txn) => (
                  <div key={txn.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-gray-50 rounded-[10px] transition-colors border-b border-gray-100 last:border-0">
                    <div className="flex items-start space-x-4 mb-2 sm:mb-0">
                      <div className={`p-3 rounded-full ${txn.type === 'earning' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {txn.type === 'earning' ? <FiArrowDownLeft /> : <FiArrowUpRight />}
                      </div>
                      <div>
                        <p className="font-poppins font-medium text-black">{txn.description}</p>
                        <p className="font-poppins text-xs text-gray-500">
                          {txn.date} • {txn.method}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className={`font-caveat text-xl font-bold ${txn.type === 'earning' ? 'text-green-600' : 'text-black'}`}>
                         {txn.type === 'earning' ? '+' : ''}₱{Math.abs(txn.amount).toLocaleString()}
                       </p>
                       <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-poppins capitalize ${
                         txn.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                       }`}>
                         {txn.status}
                       </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 font-poppins">No transactions yet.</div>
            )}
          </RoundedCard>
        </div>
      </main>
      
      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[20px] max-w-md w-full p-6">
            <h3 className="font-caveat text-2xl font-bold text-black mb-6">Withdraw Funds</h3>
            <form onSubmit={handleInitiateWithdraw}>
              <div className="mb-4">
                <label className="block font-poppins text-sm font-medium text-black mb-2">Select Method</label>
                <div className="space-y-2">
                  {paymentMethods.map(method => (
                    <label key={method.id} className={`flex items-center p-3 border rounded-[10px] cursor-pointer hover:border-black transition-colors ${selectedMethod === method.id ? 'border-black bg-gray-50' : 'border-[#EDEDED]'}`}>
                      <input 
                        type="radio" 
                        name="method"
                        value={method.id}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-poppins font-medium text-sm">{method.name}</p>
                        <p className="font-poppins text-xs text-gray-500">{method.details}</p>
                      </div>
                      <FiCreditCard className="text-gray-400" />
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-poppins text-sm font-medium text-black mb-2">Amount (PHP)</label>
                <input 
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  max={availableBalance}
                  placeholder={`Max: ${availableBalance}`}
                  className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setShowWithdrawModal(false)} className="flex-1 py-3 bg-gray-100 text-black font-poppins text-sm rounded-[10px] hover:bg-gray-200">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800">Next</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
           <div className="bg-white rounded-[20px] max-w-md w-full p-8 text-center">
             <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <FiLock className="w-8 h-8 text-blue-600" />
             </div>
             
             <h3 className="font-caveat text-3xl font-bold text-black mb-2">Verify Identity</h3>
             <p className="font-poppins text-sm text-gray-500 mb-6">
               Please enter the 6-digit code sent to your email to confirm this withdrawal of <strong>₱{Number(withdrawAmount).toLocaleString()}</strong>.
             </p>

             <form onSubmit={handleVerifyOtp}>
               <input 
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="w-full mb-6 text-center text-3xl font-bold tracking-widest py-3 border-b-2 border-gray-200 focus:border-black focus:outline-none font-poppins"
                  autoFocus
               />
               
               <div className="flex gap-3">
                 <button 
                  type="button" 
                  onClick={() => {
                    setShowOtpModal(false)
                    setShowWithdrawModal(true)
                  }} 
                  className="flex-1 py-3 bg-gray-100 text-black font-poppins text-sm rounded-[10px] hover:bg-gray-200"
                 >
                   Back
                 </button>
                 <button 
                  type="submit" 
                  disabled={isVerifying}
                  className="flex-1 py-3 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 disabled:opacity-50"
                 >
                   {isVerifying ? 'Verifying...' : 'Confirm Withdrawal'}
                 </button>
               </div>
             </form>

             <p className="mt-6 text-xs font-poppins text-gray-400">
               Didn't receive the code? <button className="text-black hover:underline">Resend</button>
             </p>
           </div>
        </div>
      )}

      <BottomNav role="freelancer" />
    </div>
  )
}
