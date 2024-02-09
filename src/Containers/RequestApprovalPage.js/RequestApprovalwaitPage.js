import React from 'react';
import RequestApprovalPage from '../../Components/Requestsent/requestsentcontent'; // Replace with the actual path to your RequestApprovalPage component
import RequestSentLottie from '../../Components/Requestsent/lottieRequestsent';
import './requestapproval.css';

function RequestAprovalWaitPage() {
  return (
    <div className='parent-request-component'>
      <div className='flex-row'>
        <RequestSentLottie isRequestSent={false} isRequestApproved={true}/>
        <div className='message-container'>
          <RequestApprovalPage isRequestSent={false} isRequestApproved={true} />
        </div>
      </div>
    </div>
  );
}

export default RequestAprovalWaitPage;
