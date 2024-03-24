# Journée (frontend) - Project Three (GA)

This was a MERN project. For this project, we decided to build a web application of a Daily Planner, where you can log a Daily Check-in, To-do’s List and Schedule events.


![app-screenshot](https://i.imgur.com/NtANrDK.png)

## Deployment

The app has been deployed and is available [here](https://journee.site/).

## Getting started

This project is separated into two repos, frontend and [backend](https://github.com/mafventura/unit3project-backend)). 

1. Access the source code via the 'Clone or download' button 
2. In CLI, run `npm i` on the root level to install dependencies
3. Run `npm start` to run the program in your local environment


## Goal and timeframe:
This was a group project (collaboration with Evylina Antao and Patrick Quayle) and we had a week to code it.


## Technologies used:
* MongoDB
* Express.js
* Node.js
* JavaScript
* React.js
* HTML
* CSS
* Axios
* GitHub
* bcrypt
* google-auth-library
* mongoose
* react-bootstrap
* cdbreact
* jsonwebtoken
* jwt-decode
* react-datepicker
* react-icons
* react-router-dom


## Brief:
☐ A **working** full-stack, single-page application hosted on Heroku.

☐ Incorporate the technologies of the **MERN-stack**:

- MongoDB/Mongoose
- Express
- React
- Node

☐ **Have a well-styled interactive front-end**.

☐ Communicates with the **Express** backend via AJAX.

☐ Implement token-based **authentication**.  Including the ability of a user to sign-up, log in & log out.

☐ Implement **authorization** by restricting CUD data functionality to authenticated users. Also, navigation should respond to the login status of the user.

☐ **Have a well-scoped feature-set**. Full-CRUD data operations are not required if one or more other features are included, for example:
	
- Consume data from a third-party API.
- Implement additional functionality if the user is an admin.
- Implementation of a highly dynamic UI or data visualization.
- Other, instructor approved, complexity/features.



## Planning:
We based our initial project on this daily planner page. And decide to have three components that the users could log:
Daily Check (water intake, sleep, mood and quote of the day)
To-Dos
Schedule

After some initial planning on how we wanted the visuals to look and the colour scheme, we started coding.

![planning-screenshot](https://i.imgur.com/JIF9uJ8.png)


## Process
We started by separating the components by the 3 of us, where I was in charge of the scheduling. Because of some family emergency happening this week, immediately on day one, initially I dropped that component and focused on helping Patrick with the Daily Check CRUD and was in charge of the styling.

I built the Edit, and Delete functions for the Daily Checks, both on the frontend and backend.

For the styling, I used the CDBReact:

```javascript
<div style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}>
     <CDBSidebar textColor="#F4F4F1" backgroundColor="#3C7D54">
       <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
         <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
           <Link to='/'>
           <img
             src={"https://i.imgur.com/oVyooXT.png"}
             alt=""
             style={{ width: "150px" }}
             className="mb-2"
           />
           </Link>
           <p
             style={{
               color: "#F4F4F1",
               margin: "5px 0 0",
               fontFamily: "PT Serif, serif",
             }}
           >
             Hello, {user?.given_name}
           </p>
         </div>
       </CDBSidebarHeader>


       <CDBSidebarContent className="sidebar-content">
         <CDBSidebarMenu>
           <NavLink to="/"  >
             <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
           </NavLink>
           <NavLink to="/dailies">
             <CDBSidebarMenuItem icon="calendar-plus">
               All Daily's
             </CDBSidebarMenuItem>
           </NavLink>
           <NavLink to="/todos">
             <CDBSidebarMenuItem icon="calendar-check">
               All To Do's
             </CDBSidebarMenuItem>
           </NavLink>
           <NavLink to="/schedule">
             <CDBSidebarMenuItem icon="calendar-week">
               Schedule
             </CDBSidebarMenuItem>
           </NavLink>
         </CDBSidebarMenu>
       </CDBSidebarContent>
       <CDBSidebarFooter style={{ textAlign: "center" }}>
         <div className="sidebar-btn-wrapper">
           <Button
             variant="secondary"
             onClick={handleLogout}
             style={{
               width: "100%",
               background: "rgb(233, 237, 200, 0.2)",
               border: "none",
               borderRadius: "0",
             }}
           >
             <CiLogout style={{ marginRight: "5px" }} />
           </Button>
         </div>
       </CDBSidebarFooter>
     </CDBSidebar>
   </div>
```
We had some trouble adjusting to working with Github as collaborators, with the pull requests and different branches, but eventually got the hang of it. 

By day 4 we were feeling confident that the project was getting on track so I decided to bring back the schedule component and code it!

Started by, following what had been done, creating the modal for it. I then added the CRUD on the back end

```javascript
app.get("/schedules", async (req, res) => {
 try {
   const userEmail = req.header("user-email");
   const user = await User.findOne({ email: userEmail });
   if (user) {
     const allSchedules = await Schedule.find({ userId: user._id });
     res.json(allSchedules);
   } else {
     console.log("Not found");
     res.status(500).json({ message: "User not found" });
   }
 } catch (e) {
   console.error(e);
   res.status(500).json({ message: "Internal server error" });
 }
});


app.post("/schedules/add", async (req, res) => {
 try {
   const userEmail = req.header("user-email");
   const user = await User.findOne({ email: userEmail });
   if (user) {
     const schedule = req.body;
     const newSchedule = new Schedule({
       date: schedule.date,
       time: schedule.time,
       event: schedule.event,
       userId: user._id,
     });
     await newSchedule.save();
     console.log(newSchedule);
     res.sendStatus(200);
   } else {
     console.log("Not found");
     res.status(500).json({ message: "User not found" });
   }
 } catch (e) {
   console.error(e);
   res.status(500).json({ message: "Internal server error" });
 }
});


app.delete('/schedules/:id', async(req, res) => {
 try {
   await Schedule.deleteOne({_id: req.params.id})
   console.log("<------------schedule deleted----------");
   res.sendStatus(200);
 } catch (e) {
   console.error(e);
   res.status(500).json({ message: "Internal server error" });
 }
})


app.put("/schedules/:id", async (req, res) => {
 try {
   const schedule = req.body;
   await Schedule.updateOne(
     { _id: req.params.id },
     {
       date: schedule.date,
       time: schedule.time,
       event: schedule.event
     }
   );
   res.sendStatus(200);
   console.log("updated schedule------------->");
 } catch (e) {
   console.error(e);
   res.status(500).json({ message: "Internal server error" });
```
Connect them to the frontend through a Context file. Finally, following our project structure, I made the pages necessary to display all the schedules added before, separated by year, month and day.



### Challenges
It was a challenge to adapt to working with collaborators. It was hard to manage all the pull requests and to keep everyone of the main and develop branches. 
But for me, the biggest challenge in this project was time, we already had a tight schedule of building these projects in a few days, and not being able to be present for big chunks of time made it harder to develop everything we were aiming for.

### Wins
I consider that there were 2 major wins in this project: The first one I believe was a group one, we made a great team, everyone was able to pitch in and in our disorganization, we were able to be very organised. We kept to a routine of checking GitHub and the pull requests 2 to 3 times a day, to "try" (big keyword here) to avoid conflicts.
The second major win was a personal one, in the first couple of days I did not believe I was going to be able to finish my part of the project due to the time constricts. But seeing it done, it tasted like a great win!

## Key learnings
I believe the major key learning was working in a group environment with GitHub which was not easy. I furthered my knowledge with styling and Bootstrap as well, trying and experimenting with a lot of dependencies and seeing what was possible. 

## Known errors or bugs
* Editing the Daily Checks sometimes doesn't work properly, resetting some of the fields on its own

## Future improvements
* Adding the edit function to the schedules section of the project
