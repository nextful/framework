const isValidUrlParamKey = (paramKey: string): boolean => {
    if (!paramKey) {
        return false;
    }

    const regexTest = new RegExp(/^(slug[1-9]+|slug$)/gm);
    return regexTest.test(paramKey);
};

export default isValidUrlParamKey;