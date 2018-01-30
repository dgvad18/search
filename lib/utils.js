"use strict";
/* 工具库 */

const request = require("request");

class Utils
{
    static urlConfig = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:54.0) Gecko/20100101 Firefox/54.0'
        }
    };

    /* JSON对象合并 */
    static extend()
    {
        let options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        if(typeof target === "boolean"){
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }

        if(typeof target !== "object" && typeof target !== 'function'){
            target = {};
        }

        if(length === i){
            target = this;
            --i;
        }

        for(;i < length; i++){
            if((options = arguments[i]) != null){
                for(name in options){
                    src = target[name];
                    copy = options[name];
                    if(target === copy){
                        continue;
                    }

                    if(deep && copy && ( this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)) )){
                        if(copyIsArray){
                            copyIsArray = false;
                            clone = src && this.isArray(src) ? src : [];
                        }else{
                            clone = src && this.isPlainObject(src) ? src : {};
                        }
                        target[name] = this.extend(deep, clone, copy);
                    }else if(copy !== undefined){
                        target[name] = copy;
                    }
                }
            }
        }

        return target;
    }

    static urlGet()
    {
        let len = arguments.length,
            i = 0,
            target = arguments[i],
            head = false;

        if(this.isNull(target))
            throw "params is null";

        if(this.isPlainObject(target)){
            this.urlConfig = this.extend({}, this.urlConfig, target);
            i++;
            target = arguments[i];
        }

        if(!this.isString(this.urlConfig.url)){
            throw "not url address";
        }

        if(i < len){
            throw "the params are too long";
        }

        if(this.isBoolean(target)){
            head = target;
            i++;
            target = arguments[i];
        }

        if(!this.isFunc(target)){
            throw "callback function is null";
        }

        request(this.urlConfig, (err, req, body) => {
            if(err) return target(err, false);
            if(head) return target(false, req);
            else return target(false, body);
        })
    }

    static urlPost()
    {


    }

    static isPlainObject(obj)
    {
        return (typeof obj === 'object' && !this.isArray(obj));
    }

    static isArray(arr)
    {
        return (arr instanceof Array);
    }

    static isNull(str)
    {
        return ((this.isString(str) && str !== '') || this.isNumber(str));
    }

    static isString(str)
    {
        return (typeof str === 'string');
    }

    static isNumber(num)
    {
        return (typeof num === 'number');
    }

    static isBoolean(bool)
    {
        return (typeof bool === 'boolean');
    }

    static isFunc(obj)
    {
        return (typeof obj === "function");
    }
}

module.exports = Utils;