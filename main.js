let mainPage = document.querySelector('.mainPage');
fetch('https://restcountries.com/v3.1/all').then((response)=>{
   return response.json();
}).then(data=>{
   getData(data);
});

function newElem(name, parent, attributes, text){
   const elem = document.createElement(name);
   for (let attr in attributes){
       elem.setAttribute(`${attr}`, `${attributes[attr]}`);
   }
   if (text) elem.innerText = text;
   parent.appendChild(elem);
   return elem;
 }

function card(name, lang, population, area, borders, maphref, imghref){
   const elem = newElem('div', mainPage, {
      'class': 'card',
   });
   const cardImgWrapper = newElem('div', elem, {
      'class': 'cardImage',
   });
   const cardImg = newElem('img', cardImgWrapper, {
      'src': `${imghref}`,
      'alt': 'card flag',
   });
   const cName = newElem('div', elem, {
      'class': 'name',
   }, `Name: ${name}`);
   const cPop = newElem('div', elem, {
      'class': 'population',
   }, `Population: ${population}`);
   const cArea = newElem('div', elem, {
      'class': 'area',
   }, `Area: ${area}`);
   const cBorders = newElem('div', elem, {
      'class': 'borders',
   }, `Borders: ${borders}`);
   const mapBtnLink = newElem('a', elem, {
      'href': `${maphref}`,
   });
   const mapBtn = newElem('div', mapBtnLink, {
      'class': 'mapBtn',
   },'MAP');
}

function getData(data){
   console.log(data);
   for (let i=0; i<data.length; i++){
      card(data[i].name.common,
                            data[i].languages, 
                            data[i].population, 
                            data[i].area,
                            data[i].borders || 'Not Avaliable',
                            data[i].maps.googleMaps,
                            data[i].flags.png,
      );
   }
}
