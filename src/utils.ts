export const validateEmail = (values: any) => {
    if (!values.email) {
        return "Email is required";
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
        return "Email is invalid";
    }
};
