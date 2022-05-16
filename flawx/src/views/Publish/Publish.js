import { postRequest, getRequest } from '../../util/request';

export const toPublish = (data) => {  //require article_title, article_authorname, article_content
    return postRequest({
        url: '/admin/uploadArticle',
        data
    })
}

