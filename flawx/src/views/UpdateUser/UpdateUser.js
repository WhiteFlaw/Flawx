import { postRequest, getRequest } from '../../util/request';

export const toUpdateUserData = (data) => {  //require username, password, motto, tag1234, sex, lastUsername
    return postRequest({
        url: "/updateUser",
        data
    })
}

export const toUpdateAvatar = (data) => {  //require username, avatar
    return postRequest({
        url: "/user/updateAvatar",
        data
    })
}