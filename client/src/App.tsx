import { useState, useEffect } from 'react'
import {
  Card,
  Typography,
  List,
  ListItem
} from "@material-tailwind/react";
import tasks from './tasks';
import * as monaco from 'monaco-editor';

const App: React.FC = () => {
  // const [state, setState] = useState(0);
  // const taskList = tasks;
  let editor: monaco.editor.IStandaloneCodeEditor;
  
  useEffect(() => {
    const target = document.getElementById("editor")!;
    if(target) {
      console.log("target",target);
      if(editor == null) editor = monaco.editor.create(target, {
				value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
				language: 'python',
        theme: "vs-dark"
      });
      console.log("monaco - ",editor)
    }
  }, []);

  return (
    <>
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography placeholder="" variant="h5" color="blue-gray">
            Sidebar
          </Typography>
        </div>
        <List>
          {
            tasks.map(task => {
              return (<ListItem>
                {task.title}
              </ListItem>
              )
            })
          }
        </List>
      </Card>
      <div style={{width: "500px", height: "500px"}} id="editor"></div>
    </>
  )
}

export default App;