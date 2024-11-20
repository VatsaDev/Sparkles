function lexer(code) {
  // Lexes code into parts
  const codeParts = [];
  const regex = /"(.*?)"/g; // Regex to split quoted parts

  const tokens = code.split(regex);

  for (const token of tokens) {
    codeParts.push(token);
  }

  return codeParts;
}

function parse(input) {
  let text = input; // Use let to avoid accidental global variable
  text = text.replace(/new/g, "let");
  text = text.replace(/is/g, "=");
  text = text.replace(/say/g, "console.log");
  text = text.replace(/shout/g, "alert");
  text = text.replace(/make/g, "function");
  return text;
}

function out(arr) {
  let code = ``;
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 === 0) {
      code = code + parse(arr[i]) + "\n";
    }
    if (i % 2 === 1) {
      code = code + '"' + arr[i] + '"'; // Preserve original quoted content
    }
  }
  return code;
}

function convert(input) {
  // Uses the lexer function and the out function to convert lexed sparkles code
  const codeLex = lexer(input);
  const code = out(codeLex);
  return code;
}

function update() {
  const inputCode = document.getElementById("sparkText").value;
  console.log("Input Code:", inputCode);
  const lines = inputCode.split("\n");
  document.getElementById("jsText").innerHTML = ""; // Clear existing content
  let num = 0;
  lines.forEach((line) => {
    const jsCode = convert(line); // Convert each line
    console.log("Converted Code:", jsCode);
    if (num === 0) {
      document.getElementById("jsText").innerHTML += jsCode.substring(0, jsCode.length - 1);
    } else {
      document.getElementById("jsText").innerHTML +=
        "<br>" + jsCode.substring(0, jsCode.length - 1);
    }
    num++;
  });
  const final = document.getElementById("jsText").innerHTML.toString();
  document.getElementById("jsText").innerHTML = final; // Directly assign final output
}
