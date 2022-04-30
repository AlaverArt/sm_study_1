class apiController {
    constructor() {
        this.abortController = null
    }
    send(url, body){
        this.abortController = new AbortController();

        const opts = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            signal: this.abortController.signal,
            body : JSON.stringify(body)
        }

        return fetch(url, opts)
            .then((resp) => {
                if(resp.ok){
                    console.log("apiController ", resp);
                    return resp;
                }
            })
    }
    cancel(){
        if(this.abortController != null)
            this.abortController.abort();
    }
}
export default new apiController();