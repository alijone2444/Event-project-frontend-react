import '../../../../../styles/navbar_home.css'
import { useMediaQuery } from '@mui/material';
import Image from '../../../../../images/Header_logo.png';

function Heading(){
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    return(
        
        <div className='parent'>
            {isSmallScreen &&
              <a>
                <img src={Image} alt="Logo" style={{height: '60px',}} />
              </a>}
            <div className="overlay"></div>

            <div className="heading-text">
                <div className="wrapper">
                    <div id="L" className="letter">I</div>
                    <div className="shadow">I</div>
                </div>
                <div className="wrapper">
                    <div id="I" className="letter">S</div>
                    <div className="shadow">S</div>
                </div>
                <div className="wrapper">
                    <div id="G" className="letter">T</div>
                    <div className="shadow">T</div>
                </div>
               
                <div className="wrapper">
                    <div className="letter">&nbsp;</div>
                    <div className="shadow">&nbsp;</div>
                </div>
               
                <div className="wrapper">
                    <div id="H" className="letter">H</div>
                    <div className="shadow">H</div>
                </div>
                <div className="wrapper">
                    <div id="T" className="letter">U</div>
                    <div className="shadow">U</div>
                </div>
                <div className="wrapper">
                    <div id="N" className="letter">B</div>
                    <div className="shadow">B</div>
                </div>
               
            </div>
        </div>
    )
}
export default Heading;