import React, { useEffect } from 'react';
import * as monaco from 'monaco-editor';
import {
  MonacoLanguageClient
} from 'monaco-languageclient';

import { Box, Button, CssBaseline, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import tasks from './tasks';
import axios from 'axios';

const drawerWidth = 240;
const url = "http://localhost:5000/tasks";

interface Sample {
  input: string;
  output: string;
}

type Task = {
  id: number | null,
  title: string;
  description: string;
  samples: Sample[];
  defFunc: string;
}

const App: React.FC = () => {
  const [data, setData] = React.useState<Task[]>([]);

  const [currentTask, setCurrentTask] = React.useState<Task>({
    id: null,
    title: "",
    description: "",
    samples: [],
    defFunc: ""
  });

  let editor: monaco.editor.IStandaloneCodeEditor | null;
  
  useEffect(() => {
    const target = document.getElementById("editor")!;
    if(target && Object.values(currentTask).length) {
      if(!target.textContent) {

        monaco.languages.register({
          id: 'python',
          extensions: ['.py'],
          aliases: ['python'],
          mimetypes: ['application/text']
        });

        editor = monaco.editor.create(target, {
          value: ['def x():', '\tprint("Hello world!");'].join('\n'),
          language: 'python',
          automaticLayout: true,
          theme: "vs-dark"
        });

        // const client = new MonacoLanguageClient().serv
      }
    };
  }, [data, currentTask]);

  useEffect(() => {
    axios.get(url).then(res => {
      setData(res.data);
    }).catch(err => {
      console.log("err -> ", err);
    });
  }, []);

  const handleTaskSelect = (taskId: number | null) => {
    console.log("TASK ID", taskId);
    axios.get(`${url}/${taskId}`).then(res => {
      console.log("RES DATA", res.data);
      setCurrentTask(res.data);
    })
  }


  if(data.length == 0) {
    console.log("no data")
    return <></>
  }

  
  return (
    <>
      <div style={{ display: "flex"}}>
        <Box sx={{ display: 'flex', width: drawerWidth, height: "100%" }}>
          <CssBaseline />
          {data.length > 0 ? data[0].title : ""}
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
            open={true}
          >
            <Divider />
            <List>
              {data.map((task, index) => (
                <ListItem onClick={() => handleTaskSelect(task.id)} key={task.id} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>

                    </ListItemIcon>
                    <ListItemText primary={task.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Drawer>
        </Box>
        <Grid container>
          <Grid item xs={6}>
              <Box sx={{ width: "100%"}}>
                <Box sx={{ p: 3 }}>
                  <Typography variant='h4' gutterBottom>
                    {currentTask.id}.{currentTask.title}
                  </Typography>
                  <Typography variant='subtitle1'>
                    {currentTask.description}
                  </Typography>
                </Box>
                <Divider/>
                <Box sx={{ p: 3 }}>
                  {
                    currentTask.samples.map((sample, index) => {
                      return (
                        <Box>
                          <Typography variant='h6'>
                            Example {index + 1}
                          </Typography>
                          <Typography>
                            Input: {sample.input} - Output {sample.output}
                          </Typography>
                        </Box>
                      )
                    })
                  }
                </Box>
              </Box>
          </Grid>
          <Grid item xs={6}>
            <div style={{width: "100%", height: "500px"}} id="editor"></div>
            <Box sx={{ backgroundColor: "black", p: 2 }}>
                  <Button variant='contained' color='success'>
                    Run
                  </Button>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default App;