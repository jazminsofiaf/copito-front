var config = {
    server_url: 'https://my-json-server.typicode.com/jazminsofiaf'
};
if(process.env.NODE_ENV === 'development'){
    console.log('dev');
    config.server_url = 'http://localhost:8080';
}
if(process.env.NODE_ENV === 'production'){
    config.server_url =  '';
}

export default config;