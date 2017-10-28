require.config({
    paths: {
        'san-state': '../san-state',
        'san': './lib/san.dev',
        'stateman': './lib/stateman'
    },
    shims: {
        'restate': ['stateman']
    }
})
require(['san', 'san-state'], function (san, sanState) {

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

    var stateman = restate({
        view: document.getElementById('app'),
        Component: san.Component
    })

    stateman.state('app', App, '')
        .state('app.blog', Blog)
        .state('app.chat', Chat)
        .start({html5: false, prefix: "!"})


})

