// changing theme settings
  function changeTheme(){
    document.body.classList.toggle('darkMode')
  }

// importing the json file from data.json
async function countryInformation() {
    const jsonUrl = './data.json';
  
    try {
      const response = await fetch(jsonUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('There has been a problem with your fetch operation: \n' + error.message);
    }
  }


//  handles displaying container for each country individually when country is passed.
  function displayCountry(data){
    const mainContainer=document.getElementById('main')

    const mainDiv=document.createElement('div');
    mainDiv.classList.add('container');

    
    const imageDiv=document.createElement('div');
    imageDiv.classList.add('image');
    const img=document.createElement('img');
    flag_image=data.flags['png']
    img.src=flag_image;
    imageDiv.appendChild(img);
    
    const infoDiv=document.createElement('div');
    infoDiv.classList.add('info');
    
    const h3=document.createElement('h3');
    // console.log(data.name)
    h3.innerText=data.name

    const contryInfo=document.createElement('div');
    contryInfo.classList.add('contry-info');

    const population=document.createElement('p');
    population.innerHTML=`<span class="bold">Population:</span> <span class="faint">${data.population}</span>`;
    contryInfo.appendChild(population);
    
    const region=document.createElement('p');
    region.innerHTML=`<span class="bold">Region:</span> <span class="faint">${data.region}</span>`;
    contryInfo.appendChild(region);
    
    const capital=document.createElement('p');
    capital.innerHTML=`<span class="bold">Capital:</span> <span class="faint">${data.capital}</span>`;
    contryInfo.appendChild(capital);
    
    infoDiv.appendChild(h3);
    infoDiv.appendChild(contryInfo);
    
    infoDiv.addEventListener('click', ()=>{
      const countryClicked=infoDiv.querySelector('h3')
      showMoreInfo(countryClicked.innerHTML)
      // console.log(countryClicked)
    })

    mainDiv.appendChild(imageDiv);
    mainDiv.appendChild(infoDiv);
    
    mainContainer.appendChild(mainDiv);
    
  }

// It will render the country information in much more details.
async function showMoreInfo(country_received){
  // console.log(country)
  const countries=await countryInformation()
  const selected_country=countries.find(country => country.name === country_received)
  if(selected_country !== undefined){
    const mainContainer=document.getElementById('main')
    const search =document.getElementById('search')
    search.style.display="none"
    mainContainer.innerHTML='';

    // console.log(selected_country.flags['png'])
    let img_src = selected_country.flags['svg'];
    
    // Create the main container div with class 'mainEntry'
    const mainEntry = document.createElement('div');
    mainEntry.className = 'mainEntry';

// Create the first inner div
    const firstDiv = document.createElement('div');
    const backButton = document.createElement('button');
    backButton.className = 'back_button';
    backButton.textContent = 'back';
    backButton.addEventListener('click',()=>{
      const mainContainer = document.getElementById('main');
      mainContainer.innerHTML = '';
      
      (async () => {
        try {
          const countriesData = await countryInformation();
          countriesData.forEach(countryInfo => {
            displayCountry(countryInfo);
          });
        } catch (error) {
          console.error('Error fetching country information:', error);
        }
      })();

    })
    firstDiv.appendChild(backButton);

// Create the second inner div with class 'countryInfo'
    const countryInfo = document.createElement('div');
    countryInfo.className = 'countryInfo';

// Create the image div
  const imageDiv = document.createElement('div');
  const image = document.createElement('img');
  image.setAttribute('src', img_src);
  imageDiv.classList.add('image');

  imageDiv.appendChild(image);

  // Create the 'more_info' div
  const moreInfo = document.createElement('div');
  moreInfo.className = 'more_info';
  const countryName = document.createElement('h3');
  countryName.textContent = selected_country.name;

  // Create the 'moreInfo' div
  const moreInfoInner = document.createElement('div');
  moreInfoInner.className = 'moreInfo';

  // Create the left and right div for details
  const leftDiv = document.createElement('div');
  leftDiv.className = 'left';
  const rightDiv = document.createElement('div');
  rightDiv.className = 'right';

  // Populate left div with details
  leftDiv.innerHTML = `
    <p>Native Name: <span>${selected_country.nativeName}</span></p>
    <p>Population: <span>${selected_country.population}</span></p>
    <p>Region: <span>${selected_country.region}</span></p>
    <p>Sub Region: <span>${selected_country.subregion}</span></p>
    <p>Capital: <span>${selected_country.capital}</span></p>
  `;

  // Populate right div with details
  rightDiv.innerHTML = `
    <p>Top Level Domain: <span>${selected_country.topLevelDomain}</span></p>
    <p>Currencies: <span>${selected_country.currencies[0]['name']}</span></p>
    <p>Languages: <span>${selected_country.languages[0]['name']}</span></p>
  `;

  // Append left and right div to 'moreInfo' div
  moreInfoInner.appendChild(leftDiv);
  moreInfoInner.appendChild(rightDiv);

  // Create the 'borders' div
  const bordersDiv = document.createElement('div');
  bordersDiv.className = 'borders';
  const neighbours =selected_country.borders;
 
  console.log(neighbours);
  
  const borderCountriesP = document.createElement('p');
  borderCountriesP.textContent = 'Border Countries: ';
  bordersDiv.appendChild(borderCountriesP);
  

  if(neighbours === null || neighbours === undefined) {
    const noBordersP = document.createElement('p');
    noBordersP.textContent = 'No borders';
    bordersDiv.appendChild(noBordersP) 
   }else{
    neighbours.forEach(neighbour => {
      const button = document.createElement('button');
      button.textContent = neighbour;
      bordersDiv.appendChild(button);
    });
  }

  moreInfo.appendChild(imageDiv);
  moreInfo.appendChild(countryName);
  moreInfo.appendChild(moreInfoInner);
  moreInfo.appendChild(bordersDiv);

  mainEntry.appendChild(firstDiv);
  mainEntry.appendChild(countryInfo);
  countryInfo.appendChild(moreInfo);

  // Append the main container div body
  mainContainer.appendChild(mainEntry);

  }
  console.log(selected_country)

}


  // this function receives the json for all countries and the selected continent
  function displayCountries(contriesData, selectedContinent) {
 
    
    contriesData.forEach((countryInfo) => {
        if (countryInfo.region === selectedContinent){
            // console.log(countryInfo.name)
            displayCountry(countryInfo);
        }
    });
  }
  


// display for each continent based on the dropdown
const filterDropdown = document.getElementById('filter-dropdown');
filterDropdown.addEventListener('change', () => {
    const selectedContinent = filterDropdown.value;
    // console.log(selectedContinent)
    (async () => {
      try {
        const countriesData = await countryInformation();
        const mainContainer=document.getElementById('main')
        mainContainer.innerHTML='';

        if (selectedContinent.toLowerCase()==='all'){
          countriesData.forEach(country => {
            displayCountry(country)
          })
        }else{
          displayCountries(countriesData, selectedContinent); 
        }
      } catch (error) {
        console.error('Error fetching country information:', error);
      }
    })();
  });
  


// display for inputed country via input field
const countrySearch = document.getElementById('country');
countrySearch.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const inputValue = countrySearch.value;
        (async () => {
            try {
                const countriesData = await countryInformation();
                const selectedCountry = countriesData.find(country => country.name.toLowerCase() === inputValue.toLowerCase());
                if (selectedCountry) {
                    const mainContainer=document.getElementById('main')
                    mainContainer.innerHTML='';
                    console.log(selectedCountry);
                    displayCountry(selectedCountry);
                    countrySearch.value = '';
                } else {
                    console.log(`No country found with the name "${inputValue}"`);
                    alert(`No country found with the name "${inputValue}"`);
                    countrySearch.value = '';
                }
            } catch (error) {
                console.error('Error fetching country information:', error);
            }
        })();
    }
});



  (async () => {
    try {
      const contriesData = await countryInformation();
        contriesData.forEach(countryInfo => {
            // console.log(contriesData[1])
            displayCountry(countryInfo);

            // console.log(data)
            
        });
    } catch (error) {
      console.error('Error fetching country information:', error);
    }
  })();

  
