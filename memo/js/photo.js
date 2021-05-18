//////////////////////////////////////////
// 読込時 //
onload = function(){
  // ストレージにデータがある場合、テーブルに入れる
  for (var i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const base64 = localStorage.getItem(key);

    let tbl = document.getElementById('list');
    let newRow = tbl.insertRow();
    let newCell = newRow.insertCell();
    let newText = document.createTextNode(key);

    newCell.appendChild(newText);
    newCell = newRow.insertCell();
    newText = document.createTextNode('Successful image saving');
    newCell.appendChild(newText);

  }
}
//////////////////////////////////////////
// webカメラの使用を許可する //

// videoタグ情報取得
const video = document.getElementById("video");

// getUserMedia によるカメラ映像の取得
const media = navigator.mediaDevices.getUserMedia({
    video: true,//ビデオを取得する
    //使うカメラをインカメラか背面カメラかを指定する場合には
    //video: { facingMode: "environment" },//背面カメラ
    //video: { facingMode: "user" },//インカメラ
    audio: false,//音声が必要な場合はture
});

//リアルタイムに再生（ストリーミング）させるためにビデオタグに流し込む
media.then( function(stream) {
    video.srcObject = stream;
});

//////////////////////////////////////////
// 撮影 //
const photoBtn = document.getElementById('photo'); 
photoBtn.addEventListener("click", function() {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  ctx.drawImage(img, 0, 0);

  video.pause();  // 映像を停止
  setTimeout( function() {
    video.play();    // 0.5秒後にカメラ再開
  }, 500);

  // canvasに画像を貼り付ける
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
});

//////////////////////////////////////////
// データ保存 //
const save = document.getElementById('save');
save.addEventListener('click', function(){
  const key = document.getElementById('key').value;
  const canvas = document.querySelector("#canvas");
  const urlStr = canvas.toDataURL();
  
  if (key != '' && urlStr != '') {
    localStorage.setItem(key, urlStr);
    
    let tbl = document.getElementById('list');
    let newRow = tbl.insertRow();
    let newCell = newRow.insertCell();
    let newText = document.createTextNode(key);

    newCell.appendChild(newText);
    newCell = newRow.insertCell();
    newText = document.createTextNode('Successful image saving');
    newCell.appendChild(newText);
  }
});

//////////////////////////////////////////
// データ読込 //
const display = document.getElementById('display');
display.addEventListener('click', function(){
  const key = document.getElementById('text_key').value;
  if (key != '')
  {
    const base64 = localStorage.getItem(key);
    const image = new Image();
    image.src = base64;
    image.onload = function(){
      const select_canvas = document.querySelector("#select_canvas");
      const ctx = select_canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);
    }
  }
});

//////////////////////////////////////////
// データ削除 //
const del = document.getElementById('delete');
del.addEventListener('click', function(){
  const text_key = document.getElementById('text_key').value;
  if (text_key != '')
  {
    for(let i=0; i<localStorage.length; i++){

      let tbl = document.getElementById('list');

      localStorage.removeItem(tbl.rows[i+1].cells[0].innerHTML);

      tbl.deleteRow(i+1);
    }

    const aaaa = document.querySelector("#select_canvas");
    const bbbb = select_canvas.getContext("2d");
    bbbb.clearRect(0, 0, aaaa.width, aaaa.height);
  }
});