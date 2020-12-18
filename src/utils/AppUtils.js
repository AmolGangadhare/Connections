import NetInfo from "@react-native-community/netinfo";

/**
 * This file contains all the utility methods that can be used throughout the app.
 */

/**
 * Check internet connectivity status
 */
export const CheckInternetStatus = async () => {
    try {
        let promise = new Promise(async (resolve, reject) => {
            NetInfo.fetch().then(state => {
                resolve(state.isConnected && state.isInternetReachable);
            });
        })
        return promise;
    } catch (error) {
        return false;
    }
};