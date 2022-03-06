export const success = (message, data) => {
    const model = {
        status: true,
        message,
        createdAt: new Date(),
        data
    };
    if (data) {
        model["data"] = data;
    }
    return model;
}

export const failure = (message, reason) => {
    return {
        status: false,
        message,
        reason,
        createdAt: new Date()
    };
}

export const includesInArr = (arr, id) => {
    const exists = arr.filter((item) => item.id === id);
    return exists.length > 0;
}