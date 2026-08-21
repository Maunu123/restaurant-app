    import React from 'react'
    import "./ExploreMenu.css"
    import{menu_list}from '../../assets/assets'

    const ExploreMenu = ( {category,setcategory}) => {
    return (
        <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Welcome to our restaurant, where every dish is made with fresh ingredients and rich flavors. From comforting classics to creative specials, our menu offers something delicious for every taste. Enjoy a warm, satisfying dining experience with us </p>
        <div className='explore-menu-list'>
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setcategory(prev=>prev===item.menu_name?'ALL':item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={category===item.menu_name?'active':''} src={item.menu_image} alt=""/>
                        <p>{item.menu_name}</p>

                    </div>
                )
            })}
        </div>
        <hr/>


        </div>
    )
    }

    export default ExploreMenu
