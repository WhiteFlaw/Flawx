import { postRequest, getRequest } from '../../util/request'

export const toSubmitForm_mima = (data) => {  //require username, password
    return postRequest({
        url: '/doLogin',
        data
    })
}

