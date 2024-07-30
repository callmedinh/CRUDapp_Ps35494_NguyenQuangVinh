import React from 'react'
import '../App.js'


function Home() {

    const banner = '/image/banner.jpg';



    return (
        <div class="bodyct">
            <div class="Container">
                {/* Header */}
                <div class="Header">
                    <img src={banner} alt="s" />


                    <div class="left-bottom">
                        <h1>FPT Polytechnic</h1>
                    </div>
                </div>
                {/* menu */}
                <nav class="menu">
                    <ul>
                        <li><a href='/'>TRANG CHỦ</a> </li>
                        <li><a>SẢN PHẨM</a>
                            <ul class="submenu">
                                <li> <a href='/Distributor'>DISTRIBUTOR</a>   </li>
                                <li> <a href='/fruit'>FRUIT</a>   </li>
                            </ul>
                        </li>
                        <li><a href='/user'>USER</a>

                        </li>
                        <li><a>GÓP Ý</a>
                        </li>
                        <li><a href='/login'>ĐĂNG NHẬP</a></li>
                    </ul>
                </nav>
                {/* sanpham */}


            </div>
        </div>
    )
}

export default Home