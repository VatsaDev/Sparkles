function lexer(code) {
  // lexes code into parts
  const codeParts = [];
  const regex = /"(.*?)"/g; // quote split regex /"(.*?)"|(\r\n|\n|\r)/g

  const tokens = code.split(regex);

  for (const token of tokens) {
    codeParts.push(token);
  }

  return codeParts;
}

function parse(input) {
  text = input;
  text = text.replace("new", "let");
  text = text.replace("is", "=");
  text = text.replace("say", "console.log");
  text = text.replace("shout", "alert");
  text = text.replace("make", "function");
  return text;
}

function out(arr) {
  let code = ``;
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 === 0) {
      code = code + parse(arr[i]) + "\n";
    }
    if (i % 2 === 1) {
      code = code + '"' + parse(arr[i]) + '"';
    }
  }
  return code;
}

function convert(input) {
  ```
  Uses the lexer function and the out function to convert lexed sparkles code 

  Input and Output type is text
  ```
  const codeLex = lexer(input);
  const code = out(codeLex);
  return code;
}

function update() {
  code = "`" + document.getElementById("sparkText").value + "`";
  console.log(code);
  const lines = code.split("\n");
  document.getElementById("jsText").innerHTML = "";
  num = 0;
  lines.forEach((line) => {
    jsCode = convert(line);
    console.log(jsCode);
    if (num == 0) {
      document.getElementById("jsText").innerHTML += jsCode.substring(0, jsCode.length - 1);
    } else if(num !=0) {
        document.getElementById("jsText").innerHTML +=
        "<br>" + jsCode.substring(0, jsCode.length - 1);
    }
    num++
  });
  let final = document.getElementById("jsText").innerHTML.toString()
  document.getElementById("jsText").innerHTML = final.substring(1, final.length - 1);
}
