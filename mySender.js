import apiController from "./apiController.js";

function createMySender(url, idForm){
    return new mySender(url, idForm);
}

class mySender{
    constructor(url, idForm) {
        this.SUCCEEDED = 'SUCCEEDED';
        this.REQUESTED = 'REQUESTED';
        this.FAILED = 'FAILED';
        this.status = 'SUCCEEDED';
        this.url = url;
        this.idForm = idForm;
        this.resp = '';
    }
    send = () => {
        const form = document.querySelector(`${this.idForm}`);
        const elements = Object.fromEntries((new FormData(form)).entries());
        console.log('mySender ', elements);
        this.status = this.REQUESTED;
        this.resp = '';
        return apiController.send(this.url, elements)
            .then( (resp) => {
                this.status = this.SUCCEEDED;
                this.resp = 'Форма успешно отправлена';
                return this.resp;
            })
            .catch((error) => {
                this.status = this.FAILED;
                if(error.message != 'The user aborted a request.')
                    this.resp = 'Не удалось отправить форму: ' + error.message;
                return this.resp;
            });
    }
    getStatus(){
        return this.status;
    }
    cancel(){
        apiController.cancel();
    }
    setStatusFailed(){
        this.status = this.FAILED;
    }
    setStatusSucceeded(){
        this.status = this.SUCCEEDED;
    }
    setStatusRequested(){
        this.status = this.REQUESTED;
    }
}

export {createMySender};