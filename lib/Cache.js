"use strict";
/**
 * 缓存类
 * @author <syoryken@sina.com> @date 2018-01-31
 */

const fs = require("fs"),
    md5 = require("md5"),
    config = require("../Config"),
    utils = require("./Utils"),
    cachePath = config.CACHE_SETTING.PATH;

class Cache
{
    static get(name)
    {
        if(!this.hasCache(name)){
            return false;
        }else{
            let file = fs.readFileSync(`${cachePath}/${this.getFileName(name)}`, {
                "encoding": "utf-8"
            });
            return (utils.isPlainObject(file) ? file : JSON.parse(file));
        }
    }

    static hasCache(name){
        return fs.existsSync(`${cachePath}/${this.getFileName(name)}`);
    }

    static set(name, val)
    {
        let file = val;
        if(utils.isPlainObject(val) || utils.isArray(val)){
            file = JSON.stringify(val);
        }
        fs.writeFileSync(`${cachePath}/${this.getFileName(name)}`, file, 'utf8');
    }

    static remove(name)
    {
        if(this.hasCache(name)){
            fs.unlinkSync(`${cachePath}/${this.getFileName(name)}`);
        }
    }

    static getFileName(name)
    {
        return md5(config.CACHE_SETTING.APPEND_STR + name) + ".js";
    }

    static clear()
    {
        if(fs.existsSync(cachePath)){
            let fileList = fs.readdirSync(cachePath);
            fileList.forEach((f, i) => {
                fs.unlinkSync(`${cachePath}/${f}`);
            });
            fileList = null;
        }
    }
}

module.exports = Cache;