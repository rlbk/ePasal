import React from 'react'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header'


const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
       <Header />
       <br />
       <br />
       <CheckoutSteps active={2} />
       <br />
       <br />
       <Footer />
    </div>
  )
}

export default PaymentPage