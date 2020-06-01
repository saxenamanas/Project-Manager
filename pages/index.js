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
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {format} from 'date-fns';


const useStyles = makeStyles(theme=>({
    service:{
      fontWeight:400,
    },
    users:{
      marginRight:0,
    },
    addProject:{
      borderRadius:30,
      backgroundColor:"#FFBA60",
      textTransform:"none",
      "&:hover":{
        backgroundColor:theme.palette.secondary.light,
      }
    }
    
}))

function createData(name,date,service,features,complexity,platforms,users,total,search){
  return{name,date,service,features,complexity,platforms,users,total,search}
}

export default function ProjectManager() {
  const platformOption = ['Web','Android','iOS'];
  const featureOption = ['Photo/Video','GPS','File Transfer','Users/Authentication','Biometrics','Push Notifications'];
  const websiteOption = ['Basic','Interactive','E-Commerce'];

  const [search,setSearch] = useState('');
  const [platforms,setPlatforms] = useState([]);
  const [features,setFeatures] = useState([]);
  const [complexity,setComplexity] = useState('');
  const [users,setUsers] = useState('');
  const [service,setService] = useState('');
  const [total,setTotal] = useState('');
  const [date,setDate] = useState(new Date());
  const [name,setName] = useState('');
  const [websiteChecked,setWebsiteChecked] = useState(false);
  const [iosChecked,setiosChecked] = useState(false);
  const [androidChecked,setAndroidChecked] = useState(false);
  const [customSoftwareChecked,setCustomSoftwareChecked] = useState(false);
  const [dialogOpen,setDialogOpen] = useState(false);
  const [rows,setRows] = useState([]);

  const classes = useStyles();

  const handleChange = (event) => {
    setSearch(event.target.value);

    const rowData = rows.map(row =>
      Object.values(row).filter(option => option !== true && option !== false)
    );

    const matches = rowData.map(row =>
      row.map(option =>
        option.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );

    const newRows = [...rows];
    matches.map((row, index) =>
      row.includes(true)
        ? (newRows[index].search = true)
        : (newRows[index].search = false)
    );

    setRows(newRows);
  }

  const addProject = ()=>{
    setRows([...rows,createData(
      name,
      format(date,"MM-dd-yy"),
      service,
      features.join(", "),
      service=="Website"?"N/A":complexity,
      service=="Website"?"N/A":platforms.join(", "),
      service=="Website"?"N/A":users,
      `₹${total}`,
      true
      )])
      setDialogOpen(false);
      setName("");
      setDate(new Date());
      setService("");
      setFeatures([]);
      setComplexity("");
      setPlatforms([]);
      setUsers("");
      setTotal("");
  }

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
          <TextField 
          value={search}
          onChange={(event)=>{handleChange(event)}}
          placeholder="Search project details or create a new entry." 
          style={{width:"35em",marginLeft:"5em"}} 
          InputProps={{endAdornment:(<InputAdornment onClick={()=>setDialogOpen(true)} 
          style={{cursor:"pointer"}} position="end"><AddIcon style={{fontSize:"2em"}} 
          color="primary"></AddIcon></InputAdornment>)}}></TextField>
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
                  {rows.filter(row=>row.search).map((row,index)=><TableRow key={index}>
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
        <Dialog fullWidth maxWidth="md" open={dialogOpen} onClose={()=>setDialogOpen(false)}>
          <Grid container direction="row" justify="center">
            <Grid item>
              <Typography gutterBottom variant="h1">
                Add a new Project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid direction="row" container justify="space-between">
              <Grid item>
              <Grid item sm>
                <Grid container direction="column">
                  <Grid item>
                    <TextField label="Name" id="name" value={name} onChange={(event)=>{setName(event.target.value)}}></TextField>
                  </Grid>
                  <Grid item>
                  <Grid item container style={{marginTop:"5em"}} direction="column">
                    <Grid item>
                      <Typography variant="h4">
                        Service
                      </Typography>
                    </Grid>
                      <Grid item>
                      <RadioGroup aria-label="service" name="service" label="service" value={service} onChange={event=>{setService(event.target.value);setFeatures([])}}>
                        <FormControlLabel classes={{label:classes.service}} value="Website" label="Website" control={<Radio/>}/>
                        <FormControlLabel classes={{label:classes.service}} value="Mobile Apps" label="Mobile Apps" control={<Radio/>}/>
                        <FormControlLabel classes={{label:classes.service}} value="Custom Software" label="Custom Software" control={<Radio/>}/>
                      </RadioGroup>
                    </Grid>
                    <Grid item style={{marginTop:"5em"}}>
                      <Select 
                      disabled={service=="Website"}
                      style={{width:"12em"}}
                      id="platforms" 
                      labelId="platforms" 
                      multiple
                      value={platforms}
                      onChange={event=>setPlatforms(event.target.value)}
                      displayEmpty
                      renderValue={platforms.length > 0 ? undefined : ()=>"Platforms"}
                      >
                      {platformOption.map(option=> <MenuItem key={option} value={option}>{option}</MenuItem>)}
                      </Select>
                    </Grid>
                  </Grid>
                  </Grid>
                </Grid>
              </Grid>
              </Grid>
              <Grid item>
              <Grid item sm>
                <Grid container alignItems="center" direction="column">
                  <Grid item style={{marginTop:16}}>
                    <KeyboardDatePicker format="MM/dd/yyyy" value={date} onChange={newDate=>setDate(newDate)}/>
                  </Grid>
                  <Grid item>
                  <Grid item container style={{marginTop:"5em"}} direction="column">
                    <Grid item>
                      <Typography variant="h4">
                        Complexity
                      </Typography>
                    </Grid>
                      <Grid item>
                      <RadioGroup aria-label="complexity" name="complexity" label="complexity" value={complexity} onChange={event=>setComplexity(event.target.value)}>
                        <FormControlLabel disabled={service=="Website"} classes={{label:classes.service}} value="Low" label="Low" control={<Radio/>}/>
                        <FormControlLabel disabled={service=="Website"} classes={{label:classes.service}} value="Medium" label="Medium" control={<Radio/>}/>
                        <FormControlLabel disabled={service=="Website"} classes={{label:classes.service}} value="Hard" label="Hard" control={<Radio/>}/>
                      </RadioGroup>
                    </Grid>
                  </Grid>
                  </Grid>
                </Grid>
              </Grid>
              </Grid>
              <Grid item>
              <Grid item sm>
                <Grid container alignItems="flex-end" direction="column">
                  <Grid item>
                    <TextField InputProps={{startAdornment:<InputAdornment position="start">₹</InputAdornment>}} label="Total" id="total" value={total} onChange={(event)=>{setTotal(event.target.value)}}></TextField>
                  </Grid>
                  <Grid item>
                  <Grid item container style={{marginTop:"5em"}} direction="column">
                    <Grid item>
                      <Typography variant="h4">
                        Users
                      </Typography>
                    </Grid>
                      <Grid item>
                      <RadioGroup aria-label="users" name="users" label="users" value={users} onChange={event=>setUsers(event.target.value)}>
                        <FormControlLabel disabled={service=="Website"} classes={{label:classes.service,root:classes.users}} value="0-10" label="0-10" control={<Radio/>}/>
                        <FormControlLabel disabled={service=="Website"} classes={{label:classes.service,root:classes.users}} value="10-100" label="10-100" control={<Radio/>}/>
                        <FormControlLabel disabled={service=="Website"} classes={{label:classes.service,root:classes.users}} value="100+" label="100+" control={<Radio/>}/>
                      </RadioGroup>
                    </Grid>
                    <Grid item style={{marginTop:"5em"}}>
                      <Select
                      style={{width:"12em"}}
                      id="features" 
                      MenuProps={{style:{zIndex:1302}}}
                      labelId="features" 
                      multiple
                      value={features}
                      onChange={event=>setFeatures(event.target.value)}
                      displayEmpty
                      renderValue={features.length > 0 ? undefined : ()=>"Features"}
                      >
                      {service!='Website'?featureOption.map(option=> <MenuItem key={option} value={option}>{option}</MenuItem>):websiteOption.map(option=> <MenuItem key={option} value={option}>{option}</MenuItem>)}
                      </Select>
                    </Grid>
                  </Grid>
                  </Grid>
                </Grid>
              </Grid>
              </Grid>
            </Grid>
            <Grid container style={{marginTop:"3em"}} justify="center">
              <Grid item>
                <Button color="primary"
                onClick={()=>{setDialogOpen(false)}}
                style={{fontWeight:300}}
                >
                
                  Cancel
                </Button>
              </Grid>
              <Button
              variant="contained" 
              className={classes.addProject} 
              onClick={()=>addProject()}
              disabled={service === "Website"
              ? name.length === 0 ||
                total.length === 0 ||
                features.length === 0 ||
                features.length > 1
              : name.length === 0 ||
                total.length === 0 ||
                features.length === 0 ||
                users.length === 0 ||
                complexity.length === 0 ||
                platforms.length === 0 ||
                service.length === 0}
              >
                Add Project +
              </Button>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
      </MuiPickersUtilsProvider>
    </React.Fragment>
  )
}
