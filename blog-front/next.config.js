const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')

if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
    require.extensions['.scss'] = file => {}
}

module.exports = withSass(withCss({}))