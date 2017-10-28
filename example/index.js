require.config({
    paths: {
        'saunter': '../saunter',
        'san': './lib/san.dev',
        'stateman': './lib/stateman'
    },
    shims: {
        'saunter': ['stateman']
    }
})
require(['san', 'saunter'], function (san, saunter) {

    var App = san.defineComponent({
        template:
            `<div>
       <h2>主页</h2>
       <div>
         <a href='#!/chat'>Go Chat</a>|
         <a href='#!/blog'>Go Blog</a>
       </div>
       <router-view></router-view>
      </div>
     `
    })
    var Blog = san.defineComponent({
        template: `
     <div>
       Blog Page 
     </div>
   `
    })
    var Chat = san.defineComponent({
        template: `
     <div>
       <h2>聊天室</h2>
     </div>
   `
    });

    var router = saunter({
        view: document.getElementById('app'),
        Component: san.Component
    })

    router.state('app', App, '')
        .state('app.blog', Blog)
        .state('app.chat', Chat)
        .start({html5: false, prefix: "!"})


})

