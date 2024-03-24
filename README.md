# Journée (frontend) - Project Three (GA)

This was a MERN project. For this project, we decided to build a web application of a Daily Planner, where you can log a Daily Check-in, To-do’s List and Schedule events.


![app-screenshot](https://i.imgur.com/NtANrDK.png)

## Deployment

The app has been deployed and is available [here](https://playpal-mevn-frontend.netlify.app/).

## Getting started

This project is separated into two repos, frontend and [backend](https://github.com/mafventura/unit3project-backend)). 

1. Access the source code via the 'Clone or download' button 
2. In CLI, run `npm i` on the root level to install dependencies
3. Run `npm run dev` to run the program in your local environment


## Goal and timeframe:
This was a solo project and was to be completed in a week.


## Technologies used:
* MongoDB
* Express.js
* Node.js
* JavaScript


## Brief:
☐ **Have at least 2 data entities (data resources) in addition to the `User` Model** - one entity that represents the main functional idea for your app and another with a **One:Many** or **Many:Many** relationship with that main entity (embedded or referenced).
☐ **Use OAuth authentication**.
☐ Implement basic **authorization** that restricts access to features that need a logged in user in order to work (typically CUD data operations) by "protecting" those routes from anonymous users using the `ensureLoggedIn` middleware from the OAuth lesson. In addition, ensure that editing and deletion of a data resource can only be done by the user that created that data (this is done in the controller - refer to the Guide to User-Centric CRUD).
☐ Have **full-CRUD data operations** somewhere within the app's features. For example, you can have functionality that **C**reates & **U**pdates a _post_ and satisfy **D**elete functionality by implementing the ability to delete _comments_.
☐ Be styled such that the app looks and feels similar to apps we use on a daily basis - in other words, **it should have a consistent and polished user interface.**
☐ Be **deployed online**


## Planning:
Started by making an ERD to sort out the models I would need and how they connect to each other, also made a visual guidance to how I thought the navigation through the application should go.

![erd-screenshot](https://i.imgur.com/y9bwE7s.png)

![planning-screenshot](https://i.imgur.com/jasx8ap.png)


## Process
- Initial Setup of frontend and backend folders and respective repos.
- Created the endpoints on the backend
- Fixed some issues on the backend (mostly details that I missed when copying code from one endpoint to another)
- Organised some of the basic skeletons for the frontend
- Added the first couple of frontend pages(just the GET and POST, still missing EDIT and DELETE) and styling.
- Worked with Bootstrap to find the styling the app would follow and apply to the functioning pages.
- Added the Delete functions to the pages
```javascript
async function deleteGame(gameId) {
   try {
       await fetch(`${import.meta.env.VITE_API_URL}/games/${gameId}`, {
           method: 'DELETE',
           headers: {
               'Content-Type': 'application/json',
               'User-Email': userEmail.value
           }


       })
       alert('Game Deleted')
       fetchData()


   } catch (error) {
       console.error('Error deleting game:', error)
   }
}
```
with the Delete method and sending the correct headers I was able to achieve this functionality, I then have an alert pop up for the user to know it was successful and fetch the data again so the new list of games is shown,

- Created the oAuth with Google
- Added the relationships to the user so every user has their own set of Games and Players. For this, I started by adding user to all other models Schemas. I then tied the CRUD to the user.email like in this example:
```javascript
// Players - Show All Players
app.get('/players', async (req, res) => {
   const userEmail = req.headers['user-email']
   const user = await User.findOne({ 'userEmail': userEmail })
   const players = await Player.find({ }).sort('playerName')
   const playersfiltered = players.filter((player) => {
       console.log(player);
       return player.user.equals(user._id)
   })
   res.json(playersfiltered)
})

```
On the front end I had to decode the token in the cookies get the user email value, and fetch the data associated with the email, like this:
```javascript
function checkSession() {
       if (cookies.isKey('user_session')) {
           const user = decodeCredential(cookies.get('user_session'))
           userEmail.value = user.email
       }
   }


async function fetchData() {
   try {
       const response = await fetch(`${import.meta.env.VITE_API_URL}/games`, {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json',
               'User-Email': userEmail.value
           }
       })
       const result = await response.json()
       gamesBackEnd.value = result
   } catch (error) {
       console.error('Error fetching data:', error)
   }
}
```
- Added the Edit functionality to the Players
- Fixed the bug of the Player Names not showing in the logs
- Prepped everything to then deploy with Netlify


### Challenges
The most challenging part was creating the relationship with the user. I had to try a couple of different approaches (for params or middleware) and ended up structuring it by getting information from the headers. I then had to adapt everything with the code and schemes to follow this structure.

Also had some trouble with fetching the information from the players' database, it was not showing properly on some of the pages and it took a while to find a fix for it.

### Wins
The biggest win for me was when I saw the final product, especially when I started adding styling with Bootstrap and was able to find a theme that started to seem like an actual web application.

## Key learnings
I feel more comfortable with creating the CRUDS in the backend at the moment, I felt like we didn’t have the same preparation for the frontend but I find the challenge very interesting and loved to learn it. I feel a bit more comfortable with it now, but still, very brand new.

Also, the structuring of the project. I believe I learnt some lessons on what to do or not with the next one, like the creation and deletion of HTML dynamic elements, it can get tricky sometimes.

## Known errors or bugs
* To my knowledge, as of now, there are no bugs with the web application.


## Future improvements
* Future improvements are to add edit functions to the games and logs and I would also love to add a Statistic view where you can add some graphics relating to the logs.
