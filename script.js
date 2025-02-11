function replaceFunction(match, p1, p2) {
    const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' });
    const str1 = Array.from(segmenter.segment(p1), segment => segment.segment);
    const str2 = p2.split('｜');
    let str3 = '';

    for (let i = 0; i < str1.length; i++) {
        str3 += `${str1[i]}<rt>${str2[i]}</rt>`;
    }

    return `<ruby>${str3}</ruby>`;
}

const pattern = /｜(.*?)《(.*?)》/g;

document.getElementById('inputText').addEventListener('input', function () {
    const inputContent = this.value;
    const modifiedContent = inputContent.replace(pattern, replaceFunction);
    document.getElementById('outputBox').innerHTML = modifiedContent;
});

// document.getElementById('copyButton').addEventListener('click', function () {
//     const outputContent = document.getElementById('outputBox').innerHTML;
//     navigator.clipboard.writeText(outputContent).then(() => {
//         alert('HTMLがクリップボードにコピーされました！');
//     }).catch(err => {
//         console.error('コピーに失敗しました:', err);
//         alert('コピーに失敗しました。');
//     });
// });

document.getElementById('copyButton').addEventListener('click', () => {
    navigator.clipboard.writeText(document.getElementById('outputBox').innerHTML);
});


