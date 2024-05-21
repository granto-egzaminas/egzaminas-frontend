import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <div className='footer'>
        <div className='sb_footer section_padding'>
            <div className='sb_footer-links'>
                <div className='sb_footer-links-div'>
                <h4>For Business</h4>
                <a href="/employer">
                    <p>Employer</p>
                </a>
                <a href="/healtPlan">
                    <p>Health Plan</p>
                </a>
                <a href="/individual">
                    <p>individual</p>
                </a>
                </div>
                <div className='sb_footer-links_div'>
                <h4>Resourses</h4>
                <a href="/Recourse">
                    <p>RRR.LT</p>
                </a>
                <a href="/Resourse">
                    <p>Zygio Baldai</p>
                </a>
                <a href="/Resourse">
                    <p>Senukai</p>
                </a>
                </div>
                <div className='sb_footer-links_div'>
                    <h4>Partners</h4>
                <a href="/Partners">
                    <p>Moki-vezi</p>
                </a>
                </div>
                <div className='sb_footer-links_div'>
                <h4>Resourses</h4>
                <a href="/About">
                    <p>About us</p>
                </a>
                <a href="/Contact us">
                    <p>Contact us </p>
                </a>
                <a href="/Home">
                    <p>Home</p>
                </a>
                </div>
                <hr />

                <div className='sb_footer-below'>
                    <div className='sb_footer-copyright'>
                        <p>
                            @2002 CodeInn.  All Right reserverd.
                        </p>
                    </div>
                    <div className='sb_footer-below-links'>
                        <a href="/terms"><div><p>Terms & Conditions</p></div></a>
                        <a href="/privacy"><div><p>Privacy</p></div></a>
                        <a href="/security"><div><p>Security</p></div></a>
                        <a href="/cokies"><div><p>Cokies</p></div></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer