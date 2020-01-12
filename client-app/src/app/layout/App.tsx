import React, { useState, useEffect, Fragment } from "react";
import {  Container } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from "./models/activity";
import { NavBar } from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );

  const [editMode, setEditMode]= useState(false);

  const handleSelextActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  const handleCreateActivity = (activity: IActivity) =>
  {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity: IActivity) =>{
    setActivities([...activities.filter(a=>a.id !== activity.id), activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleDeleteActivity = (id:string) =>
  {
    setActivities([...activities.filter(a=>a.id !==id)])
  }

const handleOpenCerateForm =() =>{
  setSelectedActivity(null);
  setEditMode(true);
}

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(responce => {
        let activities=[];
        responce.data.forEach(activity =>{
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        })
        setActivities(responce.data);
      });
  }, []);

  /* componentDidMount() {
    axios.get<IActivity[]>("http://localhost:5000/api/activities").then(responce => {
      this.setState({
        activities: responce.data
      });
    });
  }*/

  return (
    <Fragment>
      <NavBar openCreateForm ={handleOpenCerateForm}/>
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelextActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode = {setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity = {handleEditActivity}
          deleteActivity = {handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
