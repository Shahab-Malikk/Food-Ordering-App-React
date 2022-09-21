import { useEffect,useState } from 'react';
import Card from '../UI/Card'
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';

  const AvailableMeals=()=>{
const [meals, setMeals] = useState([]);
const [isLoading,setIsLoading]=useState(true)
const[isError,setIsError]=useState()

    useEffect(() => {
const fetchMeals= async ()=>{
  const response= await fetch('https://food-ordering-system-72519-default-rtdb.firebaseio.com/meals.json')
  if(!response.ok){
    throw new Error('Something went wrong')
  }
  const resposeData =await response.json()
let mealData=[]
for(let key in resposeData){
  mealData.push({
    id:key,
    name:resposeData[key].name,
    description:resposeData[key].description,
    price:resposeData[key].price
    
})
   
}
setMeals(mealData)
setIsLoading(false)
}

fetchMeals().catch(error=>{
  setIsLoading(false)
  setIsError(error.message)

})


}, []);

const mealsList=meals.map(meal=><MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price}></MealItem>)
let content


if(isLoading){
 
  content=<section className={classes.loadingMeals}>
  <h1>Loading Data...</h1>
  
  </section>
}
if(isError){
  content=<section className={classes.error}>
  <h1>{isError}</h1>
  </section>
}

else{
  content=<section className={classes.meals}>
  <Card>
  <ul>
  {mealsList}
  </ul></Card>
   </section>
}
    

    return content

  }
  export default AvailableMeals
             