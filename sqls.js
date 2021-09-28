let sqls = {
    login : (name,password)=>{
        return 'select * from feiyu_admin where name = "'+name+'" and password = "'+password+'"'
    },
    getadmuser : ()=>{
        return 'select * from feiyu_admin where id = 1'
    },
    getset : ()=>{
        return 'select value from feiyu_set where id = 1'
    },
    tostr : (data)=>{
        return JSON.stringify(data)
    },
    tojson : (data)=>{
        return JSON.parse(data)
    },
    saveset:(value)=>{
        let data = {value:JSON.stringify(value),time:new Date().getTime()}
        let res = {sql:'insert into feiyu_set set ?',data:data}
        return res
    },
    upset:(value)=>{
        let data = {value:JSON.stringify(value),time:new Date().getTime()}
        let res = {sql:'update feiyu_set set ? where id = 1',data:data}
        return res
    },
    upseo : (value)=>{
        let res = {sql:'update feiyu_seo set ? where id = 1',data:value}
        return res
    },
    upinfo : (arr)=>{
        let sql = "update feiyu_"+arr.table+" set ? where "+arr.where
        let res = {sql:sql,data:arr.data}
        return res
    },
    allres : (sign)=>{//验签
        let result = {status:500}
        if(sign){
            result = {status:200}
        }
        return result
    },
    ifres : (data)=>{//根据是否有返回值来判断状态
        let res
        if(data){
            res = {status:200,data:data}
        }else{
            res = {status:404}
        }
        return res
    },
    res : (array,sign)=>{
        let result = {status:200,sign:sign}
        if(!array.length){
            result = {status:500}
        }
        return result
    },
    insert : (table,data)=>{
        let res = {sql:'insert into feiyu_'+table+' set ? ',data:data}
        return res
    },
    delinfo : (arr)=>{
        let sql = 'delete from feiyu_'+arr.table+' where '+arr.where;
        return sql;
    },
    read : (arr)=>{
        return 'select '+arr.cols+' from feiyu_'+arr.table+' where '+arr.where
    },
    imgres : (name)=>{
        let result = {status:200,img:name}
        return result
    }
}
module.exports = sqls