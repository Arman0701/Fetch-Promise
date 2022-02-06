const body = document.querySelector('body');
const menuBtn = document.querySelector('.menuBtn');
const sideBar = document.querySelector('.sideBar');
menuBtn.addEventListener('click', ()=>{
   if (!openSideBar){
      sideBar.style = 'transform: translateX(0%);';
      openSideBar = true;
   } else {
      sideBar.style = 'transform: translateX(-150%);';
      openSideBar = false;
   }
});

const allInfoBtn = document.querySelector('.allInfoBtn');
const allInfoMenu = document.querySelector('.allinfoMenu');
allInfoBtn.addEventListener('click', ()=>{
   if (!openAllInfo) {
      allInfoMenu.style.display = 'flex'
      allInfoMenu.style.height = 'auto';
      allInfoMenu.style.padding = '15px 0';
      openAllInfo = true;
   } else {
      allInfoMenu.style.height = 0;
      allInfoMenu.style.padding = 0;
      openAllInfo = false;
   }
})

let openSideBar = false;
let openAllInfo = false;

function newElem(name, parent, attributes, text){
  const elem = document.createElement(name);
  for (let attr in attributes){
      elem.setAttribute(`${attr}`, `${attributes[attr]}`);
  }
  if (text) elem.innerText = text;
  parent.appendChild(elem);
  return elem;
}

const sideBarItems = document.querySelectorAll('.sideBarItem');
let src = 'https://restcountries.com/v3.1/name/armenia';
sideBarItems.forEach(elem=>{
   elem.addEventListener('click', ()=>{
      const src = elem.getAttribute('data-src');
      fetch(src).then((response) => {
         return response.json();
      }).then((data) => {
         getData(data);
      });
   });
});
fetch(src).then((response) => {
   return response.json();
}).then((data) => {
   getData(data);
});

function getData(data){
   console.log(data);

   const pics = document.querySelector('.pics');
   pics.innerHTML = '';
   newElem('img', pics, {
      'class': 'pic1',
      'alt': 'flag of country',
      'src': `${data.map(item=>{ return item.flags.png })}`,
   });
   newElem('img', pics, {
      'class': 'pic2',
      'alt': 'coat if arms',
      'src': `${data.map(item=>{ return item.coatOfArms.png })}`,
   })
   const aboutList = document.querySelector('.aboutList');
   aboutList.innerHTML = '';
   const aboutListDatas = [`Country: ${data.map((item)=>{ return item.name.common })}`, 
                           `Language: ${data.map((item)=>{ return item.languages.hye })}`, 
                           `Capital: ${data.map((item)=>{ return item.capital })}`, 
                           `Population: ${data.map((item)=>{ return item.population })}`, 
                           `Total Area: ${data.map((item)=>{ return item.area })}`, ];
   for (let i=0; i<aboutListDatas.length; i++){
      newElem('p', aboutList, {
         'class': 'aboutListItem',
      }, aboutListDatas[i]);
   }
   const mapBtn = document.querySelector('.mapBtn');
   mapBtn.href = '';
   mapBtn.href = `${data.map(item=>{ return item.maps.googleMaps})}`;

   const allInfoMenuItems = document.querySelector('.menuItems');
   allInfoMenuItems.innerHTML = '';
   const menuItemsData = [
      {label: 'Coordinates: ', value: `${data.map(item=>{ return item.capitalInfo.latlng})}`},
      {label: 'Continent: ', value: `${data.map(item=>{ return item.continents})}`},
      {label: 'Currencies: ', value: `${data.map(item=>{ return item.currencies.AMD.name})}`},
      {label: 'Time Zone: ', value: `${data.map(item=>{ return item.timezones})}`},
      {label: 'Borders: ', value: `${data.map(item=>{ return item.borders})}`},
      {label: 'Start of week: ', value: `${data.map(item=>{ return item.startOfWeek})}`},
      {label: 'Domain: ', value: `${data.map(item=>{ return item.tld})}`},
      {label: 'Status: ', value: `${data.map(item=>{ return item.status})}`},
      {label: 'IDD: ', value: `${data.map(item=>{ return item.idd.root })}${data.map(item=>{ return item.idd.suffixes })} `},
   ];
   for (let i=0; i<menuItemsData.length; i++){
      const menuItem = newElem('div', allInfoMenuItems, {
         'class': 'item',
      });
      const menuItemLabel = newElem('label', menuItem, {
         'for': '',
      }, menuItemsData[i].label);
      menuItemDesc = newElem('p', menuItemLabel, {
         'class': 'labelValue',
      }, menuItemsData[i].value);
   }
}