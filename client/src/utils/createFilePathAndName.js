export default (file, url) => {
    if(file){
        const filePath = `${url}${file}`;
        const [ , ...fileName] = file.split('_');

        return {
            filePath,
            fileName: fileName.join('_')
        }
    }else{
        return null
    }
};