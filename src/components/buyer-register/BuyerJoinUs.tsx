import React from 'react'
import CustomButton from '../customButton/CustomButton'
import { GoArrowRight } from 'react-icons/go'
import { useRouter } from 'next/navigation'

const BuyerJoinUs = () => {
  const router=useRouter()
  return (
    <div className="relative">
    <div
      className="bg-cover bg-center h-96"
      style={{ backgroundImage: "url(images/vendor-register/joinbg.png)" }}
    >
      <div className="bg-opacity-90 h-full flex items-center justify-center py-20">
        <div className="text-center p-4 max-w-4xl text-white">
          <h1 className="text-2xl text-white font-bold mb-4">
            Join Our Community
          </h1>
          <p className="mb-10 text-white">
          Ready to embark on your sustainable building journey? Sign up as a <br/>buyer and discover the benefits of shopping at hubeco.market
          </p>
          <div className="flex items-center justify-center">
            <div className="flex flex-col md:flex-row gap-4">
              <CustomButton
                title={"Register as a Buyer"}
                className="text-white font-semibold h-12 md:h-12 md:w-40 w-30 md:text-md text-sm"
                customStyles={{
                  border: "1px solid #FFFFFF",
                  color: "#FFFFFF",
                  minWidth: "200px",
                }}
                hoverBgColor="white"
                hoverColor="black"
                rightIcon={<GoArrowRight />}
                onPress={()=>{router.push('/login')}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default BuyerJoinUs