import React from 'react'
interface NavbarProps {
    lable : string;
}
const NavbarItem:React.FC<NavbarProps> = ({lable}) => {
  return (
    <div className='text-white cursor-pointer hover:text-gray-300 transition' >
        {lable}
    </div>
  )
}

export default NavbarItem