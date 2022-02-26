import * as fs from 'fs-web';

const dataPath='../base.json';

export const jsonHandler = {
    loadData: async () => {
        fs.fileRead(dataPath).then((d)=>{
            return JSON.parse(d);
        });
    }
}