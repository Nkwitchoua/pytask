import Sk from "skulpt";

const runCode = (code) => {
    if(!code) {
        return ;
    }
}

const stdout = {
    write: (text) => console.log(text),
  };

const pythonCode = `
print("Hello, world!");
`;

Sk.fileRun(pythonCode, stdout);