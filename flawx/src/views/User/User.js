import { postRequest, getRequest } from '../../util/request';

export const toGetUserData = (data) => {  //require username
    return postRequest({
        url: '/getUserData',
        data
    })
}

export const toGetUserArticle = (data) => {  //require username
    return postRequest({
        url: '/getUserArticle',
        data
    })
}

export const toDeleteArticle = (data) => {  //require article_id
    return postRequest({
        url: '/user/delArticle',
        data
    })
}