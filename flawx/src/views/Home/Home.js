import { postRequest, getRequest } from '../../util/request';

export const toGetChangeLog = () => {  //no require
    return postRequest({
        url: '/getChangelog'
    })
}

export const toGetLatestArticle = () => {  //no require
    return getRequest({
        url: '/getLatestArticle'
    })
}

export const toGetHottestArticle = () => {  //no require
    return getRequest({
        url: '/getHottestArticle'
    })
}