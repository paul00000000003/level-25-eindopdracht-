async function voegElementToeCall() {
    try {
        method = {
            method: "POST",
            body: JSON.stringify({ omschrijving: omschrijving, done: false }),
            headers: {
                "Content-Type": "application/json",
            },
        };
        await fetch(basisUrl, method)
    } catch (err) { console.log(err) };
}

async function wijzigTaakCall(id, done, omschrijving) {
    try {
        method = {
            method: "PUT",
            body: JSON.stringify({ omschrijving: omschrijving, done: done }),
            headers: {
                "Content-Type": "application/json",
            },
        };
        str = basisUrl + "/" + id;
        await fetch(str, method)
    } catch (err) { console.log(err) }
}

async function verwijderTaakCall(id) {
    try {
        method = { method: "DELETE" };
        str = basisUrl + "/" + id;
        await fetch(str, method);
    } catch (err) { console.log(err) }
}

async function verzamelTakenCall() {
    try {
        let text = await fetch(basisUrl);
        let result = await text.json();
        return result;
    } catch (err) { console.log(err) }
}