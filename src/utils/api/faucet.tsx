import axios from './index';

export const getFaucetNetwork = async () => {
    try {
        const result = await axios.get('/api/v1/network-info');
        return result;
    } catch (error) {
        console.log('[Error in getFaucetNetwork]');
        throw new Error("Error: getFaucetNetwork")
    }
}

interface IPayload {
    wallet: string;
    network: string;
    token: string;
}
export const mintFaucetToken = async (payload: IPayload) => {
    try {
        const result = await axios.post('/api/v1/claim-faucet-v2', payload);
        return result;
    } catch (error) {
        throw error
    }
}