import '../../../../../styles/navbar_home.css';
import { useMediaQuery } from '@mui/material';
import Image from '../../../../../images/paint_logo.png';

function Heading(props) {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const letters1 = ["I", "S", "T", "\u00A0", "E", "M", "S"];
    const letters2 = ["E", "V", "E", "N", "T", "\u00A0", "M", "A", "N", "A", "G", "E", "M", "E", "N", "T", "\u00A0", "S", "Y", "S", "T", "E", "M"];

    return (
        <div className='parent'>
            {isSmallScreen && (
                <a>
                    <img src={Image} alt="Logo" style={{ height: '60px' }} />
                </a>
            )}
            <div className="overlay"></div>
            <div className="heading-text">
                {props.heading === 'heading1' ? (
                    letters1.map((letter, index) => (
                        <div key={index} className="wrapper">
                            <div className="letter">{letter}</div>
                            <div className="shadow">{letter}</div>
                        </div>
                    ))
                ) : (
                    letters2.map((letter, index) => (
                        <div key={index} className="wrapper">
                            <div className="letter">{letter}</div>
                            <div className="shadow">{letter}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Heading;
