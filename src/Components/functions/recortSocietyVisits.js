import constants from "../../Constants/constants";
import createAuthenticatedRequest from "../../RequestwithHeader";
async function recordSocietyVisit(societyName) {
    const requestInstance = createAuthenticatedRequest()
    try {
        const response = await requestInstance.post(`${constants.BASE_URL}Visited`, { societyName });

    } catch (error) {
        console.error('Error sending visit record:', error);
        throw error; // Re-throw error to be handled by the caller if needed
    }
}
export default recordSocietyVisit;