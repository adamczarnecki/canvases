const { src, dest } = require('gulp')
const replace = require('gulp-string-replace')

const defaultTask = (cb) => {
  // place code for your default task here
  cb();
}

function slugify(str)
{
    str = str.replace(/^\s+|\s+$/g, '');

    // Make the string lowercase
    str = str.toLowerCase();

    // Remove accents, swap ñ for n, etc
    const from = "ąćęłńóśźáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    const to   = "acelnoszaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa______";
    for (let i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    // Remove invalid chars
    str = str.replace(/[^a-z0-9 -]/g, '') 
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '_') 
    // Collapse dashes
    .replace(/_+/g, '_'); 

    return str;
}

const new_canva = (cb) => {
  const name = process.argv[4]
  const path = `works/${slugify(name)}`
  const files = src('src/canvas/*')
    .pipe(replace(new RegExp('@TITLE@', 'g'), name))
    .pipe(replace(new RegExp('@TITLE_PATH@', 'g'), path))
    .pipe(dest(path))

  const index = src('index.html')
    .pipe(replace('      <!-- end menu list -->', `      <li><a href="${path}/index.html">${name}</a></li>\n      <!-- end menu list -->`))
    .pipe(dest('./'))  
  cb()
}


exports.new = new_canva
exports.default = defaultTask