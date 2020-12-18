
/**
 * This class used to handle data to be stored in async store
 * 
 * THIS IS NOT USED AT THIS TIME AS REALM DB IS USED TO STORE DATA CAN BE USEFUL IN FUTURE.
 * 
 */




/**
 * Put data to async storage with specified key and value
 */
// export const StoreDataToAsyncStore = async (key, value) => {
//     var isPutSuccess = false;

//     try {
//         await AsyncStorage.setItem(key, value);
//         isPutSuccess = true;
//     } catch (error) {
//         isPutSuccess = false;
//         console.log(error);
//     }
//     return isPutSuccess;
// };

/**
 * Get data from async storage for specified key
 */
// export const GetDataFromAsyncStore = async key => {
//     try {
//         const asyncData = await AsyncStorage.getItem(key);
//         if (null !== asyncData) {
//             return asyncData;
//         }
//     } catch (error) {
//         console.log(error);
//     }
//     return "";
// };