export const subscribe = async (price) => {
    const url = "https://www.apilukavasha.com.ge/create-checkout-session";

    const apiRequestBody = {
        "product": price
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody)
    })
        .then(res => res.json())
        .then((response) => {
            return response;
        }).catch(error => {
            return error;
        });

    return response;
}

export const getSubscription = async (id) => {
    const url = "https://www.apilukavasha.com.ge/get-checkout-session";

    const apiRequestBody = {
        "session": id
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody)
    })
        .then(res => res.json())
        .then((response) => {
            return response;
        }).catch(error => {
            return error;
        });

    return response;
}

export const getCustomer = async (customerId) => {
    const url = "https://www.apilukavasha.com.ge/get-customer";

    const apiRequestBody = {
        "customer": customerId
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody)
    })
        .then(res => res.json())
        .then((response) => {
            return response;
        }).catch(error => {
            return error;
        });

    return response;
}

export const getSubscriptionPortal = async (sessionId) => {
    const url = "https://www.apilukavasha.com.ge/create-portal-session";

    const apiRequestBody = {
        "session_id": sessionId
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody)
    })
        .then(res => res.json())
        .then((response) => {
            return response;
        }).catch(error => {
            console.log(error)
            return error;
        });

    return response;
}

