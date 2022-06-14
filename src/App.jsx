import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import { createDataSet } from "./data/dataset"
import "./App.css"
import "./components/Header/Header"
import {Header} from "./components/Header/Header"
import{Instructions} from "./components/Instructions/Instructions"
import {useState} from "react"
import "./components/Chip/Chip"
import Chip from "./components/Chip/Chip"
import "./components/NutritionalLabel/NutritionalLabel"
import NutritionalLabel, { NutritionalLabelFact } from "./components/NutritionalLabel/NutritionalLabel"


// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
const { data, categories, restaurants } = createDataSet()



export function App() {
  const[selectedCategory, setSelectedCategory] = React.useState(null)
  const[selectedrestaurant, setSelectedrestaurant] = React.useState(null)
  const[selectedMenuItem,setSelectedMenuItem] = React.useState(null)
  const categoryClick = (category) => {
    setSelectedCategory(category)
  }
  
  const restaurantClick = (restaurant) => {
    setSelectedrestaurant(restaurant)
    }
  
  const currentMenuItems = data.filter((item)=>{
    return item.food_category == selectedCategory &&item.restaurant ==selectedrestaurant
  });

  function InstructionInfo(){
    if (selectedrestaurant==null&&selectedCategory==null&&selectedMenuItem==null){

      return <Instructions instructions={appInfo.instructions.start}/>
    }
    else if(selectedCategory!=null&&selectedrestaurant==null&&selectedMenuItem==null){

      return <Instructions instructions={appInfo.instructions.onlyCategory}/>

    }
    else if(selectedrestaurant!=null&&selectedCategory!=null&&selectedMenuItem==null){
      return <Instructions instructions={appInfo.instructions.noSelectedItem}/>
    } 
    else if(selectedrestaurant!=null&&selectedCategory==null&&selectedMenuItem==null){
      return <Instructions instructions={appInfo.instructions.onlyRestaurant}/>
    }
    else if(selectedrestaurant!=null&&selectedCategory!=null&&selectedMenuItem!=null){
      return <Instructions instructions={appInfo.instructions.allSelected}/>
    }
      
  }


  
  
    
  

  return (

    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {categories.map((category,id) =>{
            return(
              <Chip 
              key = {id}
              label = {category}
              isActive = {(category === selectedCategory)}
              onClick = {()=> categoryClick(category)}
              /> 
              )
          })}
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
       <Header title={appInfo.title}
        tagline = {appInfo.tagline}
        description = {appInfo.description}/>


        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
          {restaurants.map((restaurant,id) =>{
            return(
              <Chip 
              key = {id}
              label = {restaurant}
              isActive = {(restaurant === selectedrestaurant)}
              onClick = {()=> restaurantClick(restaurant)}
              onClose = {(evt)=>{evt.stopPropagation();setSelectedrestaurant(false);}}
            
              /> 
              )
          })}
          </div>
        </div>

        
       {InstructionInfo()}
        

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {currentMenuItems.map((menuItem, idx)=>{
              return(
                <Chip
                key={idx}
                label={menuItem.item_name}
                isActive={menuItem===selectedMenuItem}
                onClick={()=> setSelectedMenuItem(menuItem)}
                onClose = {(evt)=>{evt.stopPropagation();setSelectedMenuItem(false);}}
                />

              )
            })}

          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">

          {selectedMenuItem!=null ? <NutritionalLabel item={selectedMenuItem}/>: null}
          
          </div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )

}
export default App
