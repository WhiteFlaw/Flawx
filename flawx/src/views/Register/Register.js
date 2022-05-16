import { postRequest, getRequest } from '../../util/request';

export const toRegister = (data) => {  //require username, password
    return postRequest({
        url: '/doRegister',
        data
    })
}

export const toSubmitForm_mima = (data) => {  //require username, password
    return postRequest({
        url: '/doLogin',
        data
    })
}