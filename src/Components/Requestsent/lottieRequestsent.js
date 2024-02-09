
import Lottie from 'react-lottie';
import requestsendlottieData from '../../lottie/requestsent.json';
const RequestSentLottie = () => {
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: requestsendlottieData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };
    
  
    return (
      <div style={{height:'40vh'}}>
        <Lottie options={defaultOptions} />
      </div>
    );
  }
  export default RequestSentLottie