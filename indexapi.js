let api = {
    getset : ()=>{
        let sql = 'select value from feiyu_set where id = 1';
        return sql;
    },
    getseo : ()=>{
        let sql = 'select value from feiyu_seo where id = 1';
        return sql;
    },
    getnav : ()=>{
        let sql = 'select * from feiyu_contentmodel where agent = 0 and isnav = 1 order by sort'
        return sql;
    },
    getallnav : ()=>{
        let sql = 'select * from feiyu_contentmodel where agent != 0 and isnav = 1 order by sort'
        return sql;
    },
    getchildnav : (id)=>{
        let sql = 'select * from feiyu_contentmodel where agent = '+id
        return sql;
    },
    getmodel : (route)=>{
        let sql = 'select * from feiyu_contentmodel where route = "'+route+'"'
        return sql;
    },
    getcontent : (modelid)=>{
        let sql = 'select * from feiyu_content where modelid = '+modelid
        return sql;
    },
    getmodelseo : (id)=>{
        let sql = 'select * from feiyu_seocontent where id = '+id
        return sql;
    },
    getcontentinfo : (id)=>{
        let sql = 'select * from feiyu_content where id = '+id
        return sql;
    }
    
}
module.exports = api