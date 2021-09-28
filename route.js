const {query} = require('./pool')
const api = require('./sqls')
const seckey = 'feiyucmslxp'
const sec = require('./sec')
const fs = require('fs')
function tohtml(style,model,label){
    let html = ''
    switch (style){
        case 1 :
            html = '<div class="form-group"><label>'+label+':</label><input type="text" class="form-control" ng-model="info.'+model+'"  placeholder="'+label+'"></div>'
            break;
        case 2 :
            html = '<div class="form-group"><label>'+label+':</label><textarea class="form-control" ng-model="info.'+model+'" rows=3 placeholder="'+label+'"></textarea></div>'
            break;
        case 3 :
            html = '<div class="form-group"><label>'+label+':</label><div id="'+model+'"></div></div>'
            break;
        case 4 : 
            html = '<div class="custom-file mb-3"><input type="file" onchange=upload(this,"'+model+'") id="info'+model+'" accept="image/png,image/gif,image/jpg,image/jpeg" class="custom-file-input"><label class="custom-file-label" for="info'+model+'">'+label+'</label><span style="display:none" id="'+model+'"></span><img src="https://www.runoob.com/wp-content/uploads/2014/06/download.png" id="show'+model+'" class="align-self-start mr-3" style="width:140px"></div><br><br><br><br>'
            break;
        case 5 : 
            html = '<div class="custom-file mb-3"><input type="file" multiple="multiple" onchange=uploads(this,"'+model+'") id="info'+model+'" accept="image/png,image/gif,image/jpg,image/jpeg" class="custom-file-input"><label class="custom-file-label" for="info'+model+'">'+label+'</label><span style="display:none" id="'+model+'"></span><div id="show'+model+'"></div></div><br><br><br><br>'
            break;
        case 6 :
            html = '<div class="form-group"><label>'+label+':</label><select class="form-control" ng-model="info.'+model+'"><option ng-repeat="x in selectlist" value="{{x.value}}">{{x.label}}</option></select></div>'
            break;
        default :
        html = '<div class="form-group"><label>Email:</label><input type="text" class="form-control" ng-model="info.'+model+'"  placeholder="'+label+'"></div>'
    }
    return html
}
module.exports = [
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/login',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let f = await query(api.login(q.name,sec.Encrypt(q.password,seckey)))
            let sign = sec.Encrypt(q.name+'-'+new Date().getTime(),seckey)
            return h.response(api.res(f,sign)).code(200)
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/getad',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let arr = {table:'ad',cols:'value',where:'id=1'}
                let f = await query(api.read(arr))
                if(f.length){
                    return h.response(api.ifres(api.tojson(f[0].value))).code(200)
                }else{
                    return h.response(api.ifres()).code(200)
                }
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/savead',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let data = {value:api.tostr(q),time:new Date().getTime()}
                let arr = {table:'ad',cols:'value',where:'id=1'}
                let f = await query(api.read(arr))
                if(f.length){
                    let arrs = {table:'ad',where:'id=1',data:data}
                    let apis = api.upinfo(arrs)
                    await query(apis.sql,[apis.data])
                    return h.response(api.allres(sign)).code(200)
                }else{
                    //let data = {value:api.tostr(q),time:new Date().getTime()}
                    let apis = api.insert('ad',data)
                    //console.log(apis)
                    await query(apis.sql,[apis.data])
                    return h.response(api.allres(sign)).code(200)
                }
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'POST',
        path    : '/api/feiyu/admin/upcontentinfo',
        handler : async(ctx,h)=>{
            let p = ctx.payload
            let sign = sec.Decrypt(p.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let data = {info:JSON.stringify(p.info),time:new Date().getTime()}
                let arr = {table:'content',where:'id='+p.id,data:[data]}
                let apis = api.upinfo(arr)
                await query(apis.sql,apis.data)
                //await query(apis.sql,apis.data)
                return h.response(api.allres(sign)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'POST',
        path    : '/api/feiyu/admin/savecontentinfo',
        handler : async(ctx,h)=>{
            let p = ctx.payload
            let sign = sec.Decrypt(p.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let data = {info:JSON.stringify(p.info),modelid:Number(p.mid),sort:20,status:1,time:new Date().getTime()}
                let apis = api.insert('content',[data])
                await query(apis.sql,apis.data)
                return h.response(api.allres(sign)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/getheadcol',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let arr = {table:'contentmodel',cols:'modelid',where:'id='+q.id}
                let f = await query(api.read(arr))
                let arr1 = {table:'construct',cols:'*',where:'modelid='+f[0].modelid+' order by sort'}
                let c = await query(api.read(arr1))
                return h.response(api.ifres(c)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
            
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/updatestatus',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let data = {status:q.status}
                let arr = {table:'content',where:'id='+q.id,data:[data]}
                let apis = api.upinfo(arr)
                await query(apis.sql,apis.data)
                return h.response(api.allres(sign)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'POST',
        path    : '/api/feiyu/admin/upload',
        config  :{
            payload :{
                maxBytes: 209715200,
                output:'stream',
                parse: true
            }
        },
        handler : async(ctx,h)=>{
            let imgs = []
            if(ctx.payload.len==1){
                let time = new Date().getTime(),hz = ctx.payload.name.split('.')[1],filename = 'uploads/'+time+'.'+hz
                ctx.payload.file.pipe(fs.createWriteStream(filename))
                imgs.push(filename)
            }else{
                for(let i=0;i<ctx.payload.file.length;i++){
                    let time = new Date().getTime(),hz = ctx.payload.name[i].split('.')[1],filename = 'uploads/'+time+'_'+i+'.'+hz
                    ctx.payload.file[i].pipe(fs.createWriteStream(filename))
                    imgs.push(filename)
                }
            }
            let res = {errno:0,data:imgs}
            return h.response(res).code(200)
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/saveseo',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let arr = {table:'seo',cols:'value',where:'id=1'}
                let f = await query(api.read(arr))
                let data = {value:api.tostr(q),time:new Date().getTime()}
                let apis = api.insert('seo',data)
                if(f.length){
                    apis = api.upseo(data)
                }
                await query(apis.sql,[apis.data])
                return h.response(api.allres(sign)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/getseo',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let arr = {table:'seo',cols:'value',where:'id=1'}
                let f = await query(api.read(arr))
                if(f.length){
                    return h.response(api.ifres(api.tojson(f[0].value))).code(200)
                }else{
                    return h.response(api.ifres()).code(200)
                }
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/getset',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let a = await query(api.getset())
                if(a.length){
                    let res = api.tojson(a[0].value)
                    return h.response(api.ifres(res)).code(200)
                }else{
                    return h.response(api.ifres()).code(200)
                }
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/delmodel',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let arr = {table:'model',where:'id='+q.id}
                await query(api.delinfo(arr))
                return h.response(api.allres(sign)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/getmodelbyid',
        handler : async(ctx,h)=>{
            let q = ctx.query;
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let arr = {table:'model',where:'id='+q.id,cols:'*'}
                let a = await query(api.read(arr))
                return h.response(api.ifres(a[0])).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/savecontentseo',
        handler : async(ctx,h)=>{
            let q = ctx.query;
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let arr = {table:'seocontent',cols:'*',where:'contentid='+q.contentid}
                let a = await query(api.read(arr))
                if(a.length){
                    let data = {seotitle:q.seotitle,seokey:q.seokey,seocontent:q.seocontent}
                    let arr = {table:'seocontent',where:'id='+q.contentid,data:[data]}
                    let apis = api.upinfo(arr)
                    await query(apis.sql,apis.data)
                    return h.response(api.allres(sign)).code(200)
                }else{
                    let data = {contentid:q.contentid,seotitle:q.seotitle,seokey:q.seokey,seocontent:q.seocontent}
                    let apis = api.insert('seocontent',[data])
                    await query(apis.sql,apis.data)
                    return h.response(api.allres(sign)).code(200)
                }
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/getstyle',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let arr = {table:'style',cols:'*',where:'1'}
                let a = await query(api.read(arr))
                return h.response(api.ifres(a)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/upcontentmodelinfo',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let arr = {table:'contentmodel',cols:'*',where:' id !='+ q.id+' and route="'+q.route+'"'}
                let a = await query(api.read(arr))
                if(a.length){
                    return h.response(api.allres()).code(200)
                }else{
                    let data = {name:q.name,route:q.route,template:q.template,isnav:q.isnav,sort:q.sort}
                    let arr = {table:'contentmodel',where:'id='+q.id,data:[data]}
                    let apis = api.upinfo(arr)
                    await query(apis.sql,apis.data)
                    return h.response(api.allres(sign)).code(200)
                }
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/changesort',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let data = {sort:q.sort}
                let arr = {table:'content',where:'id='+q.id,data:[data]}
                let apis = api.upinfo(arr)
                await query(apis.sql,apis.data)
                return h.response(api.allres(sign)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/changetohtml',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let arr = {table:'contentmodel',where:'id='+q.id,cols:'*'}
                let a = await query(api.read(arr)),modelid = a[0].modelid
                let tarr = {table:'construct',where:'modelid='+modelid+' order by sort ',cols:'*'}
                let c = await query(api.read(tarr))
                let yarr = {table:'construct',where:'modelid='+modelid+' and style=6 ',cols:'*'}
                let d = await query(api.read(yarr)),s=[]
                if(d.length){
                    let darr = {table:'dictionarydata',where:'did='+d[0].constructid+' ',cols:'*'}
                    s = await query(api.read(darr))
                }
                let hs = '',sa = [],img=[],imgs=[]
                if(c.length){
                    c.forEach(r=>{
                        hs += tohtml(r.style,r.value,r.label)
                        if(r.style==3){
                            sa.push(r.value)
                        }
                        if(r.style==4){
                            img.push(r.value)
                        }
                        if(r.style==5){
                            imgs.push(r.value)
                        }
                    })
                }
                let res = {html:hs,btn:sa,img:img,imgs:imgs,select:s}
                return h.response(api.ifres(res)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/upconstructinfo',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let data = {label:q.label,value:q.value,sort:q.sort}
                let arr = {table:'construct',where:'id='+q.id,data:[data]}
                let apis = api.upinfo(arr)
                await query(apis.sql,apis.data)
                return h.response(api.allres(sign)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/savecontentmodel',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let arr = {table:'contentmodel',cols:'*',where:' route="'+q.route+'"'}
                let a = await query(api.read(arr))
                if(a.length){
                    return h.response(api.allres()).code(200)
                }else{
                    let data = {name:q.name,route:q.route,template:q.template,isnav:q.isnav,modelid:q.modelid,sort:0,agent:q.agent}
                    let apis = api.insert('contentmodel',[data])
                    await query(apis.sql,apis.data)
                    return h.response(api.allres(sign)).code(200)
                }
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path : '/api/feiyu/admin/upmodelinfo',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let data = {name:q.name,beizhu:q.beizhu}
                let arr = {table:'model',where:'id='+q.id,data:[data]}
                let apis = api.upinfo(arr)
                await query(apis.sql,apis.data)
                return h.response(api.allres(sign)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path   : '/api/feiyu/admin/getdictionary',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let arr = {table:'dictionary',cols:'*',where:'1'}
                let a = await query(api.read(arr))
                return h.response(api.ifres(a)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/getmodel',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let arr = {table:'model',where:'1',cols:'*'}
                let a = await query(api.read(arr))
                return h.response(api.ifres(a)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/savedictionary',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let data = {name:q.name,beizhu:q.beizhu,sort:0}
                let apis = api.insert('dictionary',[data])
                await query(apis.sql,apis.data)
                return h.response(api.allres(sign)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/getdictionarydata',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let arr = {table:'dictionarydata',cols:'*',where:'did='+q.id}
                let c = await query(api.read(arr))
                return h.response(api.ifres(c)).code(200)
            }else{
                return h.response(api.allres).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/updictionarydata',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let data = {label:q.ulabel,value:q.uvalue}
                let arrs = {table:'dictionarydata',where:'id='+q.id,data:data}
                let apis = api.upinfo(arrs)
                await query(apis.sql,[apis.data])
                return h.response(api.allres(sign)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/savedictionarydata',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let data = {label:q.label,value:q.value,did:q.id}
                let apis = api.insert('dictionarydata',[data])
                await query(apis.sql,apis.data)
                return h.response(api.allres(sign)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/readone',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser()),where = 1
            if(b[0].name==sign){
                if(q.col&&q.value){
                    where = q.col+'='+q.value
                }
                let arr = {table:q.table,cols:q.cols,where:where}
                let a = await query(api.read(arr))
                return h.response(api.ifres(a[0])).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/allread',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser()),where = 1
            if(b[0].name==sign){
                if(q.col&&q.value){
                    where = q.col+'='+q.value
                }
                if(q.order){
                    where += ' order by sort '
                }
                
                let arr = {table:q.table,cols:q.cols,where:where}
                let a = await query(api.read(arr))
                return h.response(api.ifres(a)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/getconstructlist',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let arr = {table:'construct',cols:'*',where:'modelid='+q.id+' order by sort'}
                let a = await query(api.read(arr))
                return h.response(api.ifres(a)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/getconfig',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let arr1 = {table:'style',cols:'*',where:1}
                let arr2 = {table:'dictionary',cols:'*',where:1}
                let c = await query(api.read(arr1)),d=await query(api.read(arr2))
                let res = {style:c,dictionary:d}
                return h.response(api.ifres(res)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/saveconstructinfo',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let arr = {table:'construct',where:'value="'+q.colname+'"',cols:'*'}
                let g = await query(api.read(arr))
                if(g.length){
                    return h.response(api.allres()).code(200)
                }else{
                    let datas = {modelid:q.id,style:q.datastyle,label:q.notice,value:q.colname,constructid:q.dictionarydata,sort:20}
                    let apis = api.insert('construct',[datas])
                    await query(apis.sql,apis.data)
                    return h.response(api.allres(sign)).code(200)
                }
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/alldel',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let where = q.col+'='+q.value
                let arr = {table:q.table,where:where}
                await query(api.delinfo(arr))
                return h.response(api.allres(sign)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/feiyu/admin/savemodel',
        handler : async(ctx,h)=>{
            let q = ctx.query
            let sign = sec.Decrypt(q.sign,seckey).split('-')[0]
            let b = await query(api.getadmuser())
            if(b[0].name==sign){
                let arr = {table:'model',where:'name="'+q.model+'"',cols:'*'}
                let a = await query(api.read(arr))
                if(a.length){
                    return h.response(api.allres()).code(200)
                }else{
                    let data = {name:q.model,beizhu:q.beizhu,sort:0}
                    let apis = api.insert('model',[data])
                    await query(apis.sql,apis.data)
                    return h.response(api.allres(sign)).code(200)
                }
            }
        }
    },
    {
        method  : 'POST',
        path    : '/api/feiyu/admin/saveset',
        handler : async(ctx,h)=>{
            let p = ctx.payload
            let sign = sec.Decrypt(p.sign,seckey).split('-')[0]
            let a = await query(api.getadmuser())
            if(a[0].name==sign){
                let f = await query(api.getset())
                if(f.length){
                    await query(api.upset(p).sql,api.upset(p).data)
                }else{
                    await query(api.saveset(p).sql,[api.saveset(p).data])
                }
                return h.response(api.allres(sign)).code(200)
            }else{
                return h.response(api.allres()).code(200)
            }
        }
    },
    {
        method  : 'POST',
        path    : '/api/feiyu/admin/api/uploadimg',
        config  :{
            payload :{
                maxBytes: 209715200,
                output:'stream',
                parse: true
            }
        },
        handler : async(ctx,h)=>{
            let time = new Date().getTime(),hz = ctx.payload.name.split('.')[1],filename = 'uploads/'+time+'.'+hz
            ctx.payload.file.pipe(fs.createWriteStream(filename))
            return h.response(api.imgres(filename)).code(200)
        }
    }
]