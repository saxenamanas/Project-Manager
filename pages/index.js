import React,{useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from '@material-ui/icons/Add';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FilterListIcon from '@material-ui/icons/FilterList';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme=>({

}))

function createData(name,date,service,features,complexity,platforms,users,total){
  return{name,date,service,features,complexity,platforms,users,total}
}

export default function ProjectManager() {
  const [websiteChecked,setWebsiteChecked] = useState(false);
  const [iosChecked,setiosChecked] = useState(false);
  const [androidChecked,setAndroidChecked] = useState(false);
  const [customSoftwareChecked,setCustomSoftwareChecked] = useState(false);
  const [dialogOpen,setDialogOpen] = useState(false);
  const [rows,setRows] = useState([createData('Manas Saxena','24/05/2020','Website','E-Commerce','N/A','N/A','N/A','$1500'),
  createData('Manas Saxena','24/05/2020','Website','Users/Authentication/Dashboard/More/GPS/Push Notifications','N/A','N/A','N/A','$1500'),
  createData('Manas Saxena','24/05/2020','Website','E-Commerce','N/A','N/A','N/A','$1500')
  ]);

  const classes = useStyles();
  return(
    <React.Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container direction="column">
        <Grid item style={{marginLeft:"5em",marginTop:"2em"}}>
          <Typography variant="h1">
            Projects
          </Typography>
        </Grid>
        <Grid item>
          <TextField placeholder="Search project details or create a new entry." style={{width:"35em",marginLeft:"5em"}} InputProps={{endAdornment:(<InputAdornment onClick={()=>setDialogOpen(true)} style={{cursor:"pointer"}} position="end"><AddIcon style={{fontSize:"2em"}} color="primary"></AddIcon></InputAdornment>)}}></TextField>
        </Grid>
        <Grid style={{marginLeft:"5em",marginTop:"2em"}} item>
          <FormGroup row>
            <FormControlLabel style={{marginRight:"5em"}} labelPlacement="start" control={<Switch checked={websiteChecked} color="primary" onChange={()=>{setWebsiteChecked(!websiteChecked)}}/>} label="Websites"/>
            <FormControlLabel style={{marginRight:"5em"}} labelPlacement="start" control={<Switch checked={iosChecked} color="primary" onChange={()=>{setiosChecked(!iosChecked)}}/>} label="iOS Apps"/>
            <FormControlLabel style={{marginRight:"5em"}} labelPlacement="start" control={<Switch checked={androidChecked} color="primary" onChange={()=>{setAndroidChecked(!androidChecked)}}/>} label="Android Apps"/>
            <FormControlLabel style={{marginRight:"5em"}} labelPlacement="start" control={<Switch checked={customSoftwareChecked} color="primary" onChange={()=>{setCustomSoftwareChecked(!customSoftwareChecked)}}/>} label="Custom Software"/>          
          </FormGroup>
        </Grid>
        <Grid item>
          <Grid style={{marginTop:"5em"}} container item direction="row" justify="flex-end">
              <Grid item>
                <FilterListIcon color="secondary" style={{fontSize:50,marginRight:75}}></FilterListIcon>
              </Grid>
          </Grid>
        </Grid>
        <Grid item style={{marginBottom:"13em"}}>
          <TableContainer elevation={0} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Service</TableCell>
                  <TableCell align="center">Features</TableCell>
                  <TableCell align="center">Complexity</TableCell>
                  <TableCell align="center">Platforms</TableCell>
                  <TableCell align="center">Users</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
              </TableHead>
                <TableBody>
                  {rows.map((row,index)=><TableRow key={index}>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.service}</TableCell>
                    <TableCell style={{maxWidth:"5em"}} align="center">{row.features}</TableCell>
                    <TableCell align="center">{row.complexity}</TableCell>
                    <TableCell align="center">{row.platforms}</TableCell>
                    <TableCell align="center">{row.users}</TableCell>
                    <TableCell align="center">{row.total}</TableCell>
                  </TableRow>)}
                </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Dialog open={dialogOpen} onClose={()=>setDialogOpen(false)}>
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <Typography gutterBottom variant="h1">
                Add a new Project
              </Typography>
            </Grid>
          </Grid>
        </Dialog>
      </Grid>
      </MuiPickersUtilsProvider>
    </React.Fragment>
  )
}
