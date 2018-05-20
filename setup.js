(function () {
    const
        host="",
        username="",
        password="",
        key="";
    let source={},setup={};
    source.curl="https://curl.haxx.se/download/curl-7.60.0.tar.xz";
    source.openssl="https://www.openssl.org/source/openssl-1.1.1-pre6.tar.gz"; //LD_LIBRARY_PATH=/usr/lib
    source.nginx="http://nginx.org/download/nginx-1.13.12.tar.gz";
    source.pcre="https://ftp.pcre.org/pub/pcre/pcre-8.42.zip";
    source.zlib="https://zlib.net/zlib-1.2.11.tar.xz";
    source.maxmind="http://geolite.maxmind.com/download/geoip/database/GeoLiteCountry/GeoIP.dat.gz";
    source.php="http://sg2.php.net/get/php-7.2.5.tar.xz/from/this/mirror";
    console.log(45);
    const $=require('jquery'),
          readline = require('readline'),
          fs= require('fs'),
          path=require('path'),
          nodessh=require('node-ssh')
    ;
    let input=async function(x) {
        return new Promise(ok=>{
            let ask=readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            ask.question(x,ans=>{
                ok(ans);
                ask.close();
            })
        });
    }
    setup._=async function(){
        let ssh=new nodessh();
        await ssh.connect({
            host:host,
            username:username,
            password: password
        });
        return ssh;
    }
    setup.nginx=async function() {
        let ssh=await setup._();
        let zliburl=await input("Enter zlib source url (default : "+source.zlib+")");
    }
    async function ready() {
        while(true){
            let cmd=await input("Choose mode to setup!!!\n1. nginx\n2. balancer\n3. php\n4. nodejs\n5. mysql\n6. mongodb\nto exit 'exit'\nmode = ");
            if(cmd=="exit"){
                break;
            }
            switch (cmd){
                case 1:
                    await setup.nginx();
                    break;
                default:
                    console.error("\n**************************\nMode not exist\n**************************\n")
                    break;
            }
        }
        process.exit();
    }
    ready();
}());