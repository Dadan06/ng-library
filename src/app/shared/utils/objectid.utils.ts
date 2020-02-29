// tslint:disable: no-bitwise
export const generateObjectId = () => {
    const currentTimestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    return currentTimestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16)).toLowerCase();
};
