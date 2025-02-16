function replaceFunction(match, p1, p2) {
    const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' });
    const str1 = Array.from(segmenter.segment(p1), segment => segment.segment);
    const str2 = p2.split('｜');
    let str3 = '';

    i1 = 0;
    for (let i2 = 0; i2 < str2.length; i2++) {
        str1temp = '';
        while (i1 < str1.length) {
            str1temp += str1[i1]
            if (str1[i1+1] == '-') {
                i1 += 2;
            } else {
                i1 += 1;
                break;
            }
        }
        str3 += `${str1temp}<rt>${str2[i2]}</rt>`;
    }
    for (let i = i1; i < str1.length; i++) {
        str3 += str1[i]
    }
    return `<ruby>${str3}</ruby>`;
}

const pattern = /｜(.*?)《(.*?)》/g;

document.getElementById('inputText').addEventListener('input', function () {
    const inputContent = this.value;
    const modifiedContent = inputContent.replace(pattern, replaceFunction);
    document.getElementById('outputBox').innerHTML = modifiedContent;
});

document.getElementById('copyButton').addEventListener('click', () => {
    navigator.clipboard.writeText(document.getElementById('outputBox').innerHTML);
});
