const querystring = require('querystring')

class Request {
    constructor(baseUrl) {
        //基础路径
        this.baseUrl = baseUrl
    }

    /**
     * 封装请求方法
     * @param {string} url 请求地址
     * @param {string} type 请求类型
     * @param {object} data 请求参数
     * @param {object} headers 请求头配置
     */

    ajax(url, type = 'get', data = {}, headers = {}) {
        if (!url) {
            throw new Error('请求地址没有传入!')
        }

        type = type.toUpperCase()
        if (!['GET', 'POST'].includes(type)) {
            throw new Error('请求只支持GET和POST方式!')
        }

        if (type === 'GET') {
            if (Object.keys(data).length) {
                url += `?${querystring.stringify(data)}`
            }
        }

        return new Promise((resolve, reject) => {
            const config = {
                method: type,
                headers
            }
            if (type === 'POST') {
                config.body = data
            }
            fetch(this.baseUrl + url, config).then((response) => {
                return response.json()
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * get请求
     * @param {*} url 请求地址
     * @param {*} data 请求参数
     * @param {*} header 请求头配置
     */
    get(url, data = {}, header = {}) {
        return this.ajax(url, 'get', data, header)
    }

    /**
     * post请求
     * @param {*} url 请求地址
     * @param {*} data 请求参数
     * @param {*} header 请求头配置
     */
    post(url, data = {}, header = {}) {
        return this.ajax(url, 'post', data, header)
    }
}

export default new Request('https://127.0.0.1')