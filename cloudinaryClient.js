const API_USER = 'dzbao6vuo';
const API_KEY = '439246512244612';
const API_SECRET = 'lrRNF73k6CseZWkuiyWtczBo5I0';
const BASE_URL = `https://api.cloudinary.com/v1_1/${API_USER}`;
const BASE_FOLDER = 'works';
const fetch = require('node-fetch');

function getImages(){
    return get(`${BASE_URL}/resources/search?expression=resource_type:image AND folder:${BASE_FOLDER}/*`)
        .then(body => {
            const images = {};

            body.resources.forEach(res=>{
                const folderName = res.folder.substring(BASE_FOLDER.length + 1);

                if(folderName.trim().length > 0){
                    if(!images[folderName]){
                        images[folderName] = {
                            mini_image: null,
                            images: []
                        };
                    }

                    if(res.filename === folderName){
                        images[folderName].mini_image = res.url;
                    }else{
                        images[folderName].images.push(res.url);
                    }
                }
            });
            return images;
        })
}

function get(url){
    const options = {
        method: 'GET',
        headers: {
            'Authorization' : 'Basic ' + Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64')
        }
    };
    return fetch(url, options).then(res => res.json())
}

module.exports = {
    getImages
};
