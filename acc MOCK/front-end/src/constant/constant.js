export const apiBaseUrl = 'http://localhost:8080/admin';

export const getApiResponseData = (result) => {
    const { isError, isIdle, error } = result;
    if (isError) throw new Error('Error fetching data: ' + error);
    if (isIdle) throw new Error('Timeout fetching data');

    return result?.data;
};
