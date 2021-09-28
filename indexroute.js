const {query} = require('./pool')
const api = require('./indexapi')
module.exports = [
    {
        method  : 'GET',
        path    : '/',
        handler : async(ctx,h)=>{
            let a = await query(api.getset())
            let b = await query(api.getseo())
            let c = await query(api.getnav())
            let d = await query(api.getallnav())
            let i = 0
            c.forEach(r=>{
               let e =  d.filter(s=>{
                    return s.agent == r.id
                })
                if(e.length){
                    r.child = e
                }
                i++
            })
            let info = {feiyuset:JSON.parse(a[0].value),feiyuseo:JSON.parse(b[0].value),nav:c}
            return h.view('index',info)
        }
    },
    {
        method  : 'GET',
        path    : '/nav-{route}.html',
        handler : async(ctx,h)=>{
            let r = ctx.params.route
            let a = await query(api.getmodel(r))
            let b = await query(api.getcontent(a[0].modelid))
            if(b.length){
                b.forEach(r=>{
                    r.info = JSON.parse(r.info)
                })
            }
            let c = await query(api.getmodelseo(a[0].id))
            let d = await query(api.getseo())
            let e = await query(api.getnav())
            let g = await query(api.getallnav())
            let i = 0
            e.forEach(r=>{
               let f =  g.filter(s=>{
                    return s.agent == r.id
                })
                if(f.length){
                    r.child = f
                }
                i++
            })
            let res = {mseo:c[0],feiyuseo:JSON.parse(d[0].value),list:b,nav:e}
            return h.view(a[0].template,res)
        }
    },
    {
        method  : 'GET',
        path    : '/{route}-detail-{id}.html',
        handler : async(ctx,h)=>{
            let route = ctx.params.route,id = ctx.params.id
            let a = await query(api.getset())
            let b = await query(api.getseo())
            let c = await query(api.getnav())
            let d = await query(api.getallnav())
            let i = 0
            c.forEach(r=>{
               let e =  d.filter(s=>{
                    return s.agent == r.id
                })
                if(e.length){
                    r.child = e
                }
                i++
            })
            let artinfo = await query(api.getcontentinfo(id))
            artinfo[0].info = JSON.parse(artinfo[0].info)
            let info = {feiyuset:JSON.parse(a[0].value),feiyuseo:JSON.parse(b[0].value),nav:c,article:artinfo[0]}
            return h.view('detail_'+route,info)
        }
    }
]
