/*
MIT License

Copyright (c) 2024 Connor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
(() => {
  //var id = getIdFromRowAndCol(r, c);
  //$(id).find(".cx-a").text(chr);
  // get answers (stored in window.grid)
  let answers = [];
  function getIdFromRowAndCol(r, c) {
    return 'cx-' + r + "-" + c;
 }
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      let e = grid[r][c];
      if (e == null) continue;

      if (e.across != null && e.across.is_start_of_word) {
        let word = '';
        for (let i = 0; c+i != grid[r].length && grid[r][c+i] != null; i++) {
          let char = grid[r][c+i].char;
          let id = getIdFromRowAndCol(r,c+i);
          if (char){
            let element = document.getElementById(id)
            if (element){
              element.getElementsByClassName("cx-a")[0].innerHTML = char
            }
          }
          word += char;
        }
        answers.push(word);
      }
      if (e.down != null && e.down.is_start_of_word) {
        let word = '';
        for (let i = 0; r+i != grid.length && grid[r+i][c] != null; i++) {
          let char = grid[r+i][c].char;
          let id = getIdFromRowAndCol(r+i,c);
          if (char){
            let element = document.getElementById(id)
            if (element){
              element.getElementsByClassName("cx-a")[0].innerHTML = char
            }
          }
          word += char;
        }
        answers.push(word);
      }
    }
  }
  
  // make a popup
  let popup_html = `
  <!DOCTYPE html>
  <head>
    <style>
    * {font-family: Arial}
    </style>
  </head>
  <body>
    <h1>Answers</h1>
    <ol>
      ${answers.map(a => '<li>' + a + '</li>').join('\n')}
    </ol>
  </body>
  `;
  popup = window.open('about:blank', '', 'width=600 height=400');
  popup.document.write(popup_html);
})()
