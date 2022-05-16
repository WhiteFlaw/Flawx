import { postRequest, getRequest } from '../../util/request';

export const toSubmitComments = (data) => {  //require comment_name, comment_content, comment_avatar, article_id
    return postRequest({
        url: '/admin/insertComments',
        data
    })
}

export const toGetArticle = (data) => {  //require article_id
    return postRequest({
        url: '/getArticleById',
        data
    })
}

export const toGetUserData = (data) => {  //require username
    return postRequest({
        url: '/getUserData',
        data
    })
}

export const toUpdateViewCount = (data) => {  //require viewCount, totalView, article_id, username
    return postRequest({
        url: '/updateViewCount',
        data
    })
}

export const toGet5UserArticle = (data) => {  //require username
    return postRequest({
        url: '/get5UserArticle',
        data
    })
}

export const toGetComments = (data) => {  //require article_id
    return postRequest({
        url: '/getComments',
        data
    })
}

export const toUpdateAgree = (data) => {  //require article_id, article_agree, agree, username
    return postRequest({
        url: '/updateAgree',
        data
    })
}