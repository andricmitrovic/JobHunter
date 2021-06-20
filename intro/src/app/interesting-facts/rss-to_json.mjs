import fs from "fs";
import Parser from "rss-parser";

(async function main(){
    const parser=new Parser();

    const feed=await parser.parseURL("https://techxplore.com/rss-feed/computer-sciences-news/");

    let items=[];

    const fileName = `news.json`;

    if (fs.existsSync(fileName)) {
         items = require(`./${fileName}`);
    }
    
    await Promise.all(feed.items.map(async (currentItem) => {
        if (items.filter((item) => isEquivalent(item, currentItem)).length <= 0) {
            items.push(currentItem);
        }
    }));

    fs.writeFileSync(fileName, JSON.stringify(items));
})();

function isEquivalent(a, b) {
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
}