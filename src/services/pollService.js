import createAuthenticatedRequest from '../RequestwithHeader';
import constants from '../Constants/constants';

const requestInstance = createAuthenticatedRequest();

export const pollService = {
    // Get all polls
    getAllPolls: async () => {
        try {
            const response = await requestInstance.get(`${constants.BASE_URL}get-polls`);
            return response.data;
        } catch (error) {
            console.error('Error fetching polls:', error);
            throw error;
        }
    },

    // Get polls by event ID
    getPollsByEventId: async (eventId) => {
        try {
            const response = await requestInstance.get(`${constants.BASE_URL}get-polls/${eventId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching polls by event ID:', error);
            throw error;
        }
    },

    // Get active polls with dynamic parameter
    getActivePolls: async (type = 'regular') => {
        try {
            const response = await requestInstance.get(`${constants.BASE_URL}get-active-polls`, {
                params: {
                    type: type // 'home' for admin polls, 'regular' for normal polls
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching active polls:', error);
            throw error;
        }
    },

    // Vote on a poll
    voteOnPoll: async (pollId, optionId) => {
        try {
            const response = await requestInstance.post(`${constants.BASE_URL}vote-poll`, {
                pollId,
                optionId
            });
            return response.data;
        } catch (error) {
            console.error('Error voting on poll:', error);
            throw error;
        }
    },

    // Submit survey response
    submitSurveyResponse: async (pollId, responses) => {
        try {
            const response = await requestInstance.post(`${constants.BASE_URL}submit-survey`, {
                pollId,
                responses
            });
            return response.data;
        } catch (error) {
            console.error('Error submitting survey response:', error);
            throw error;
        }
    }
};

export default pollService; 