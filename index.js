// const countryInformation=()=>{
//     // Define the URL of the JSON file
//     const jsonUrl = './data.json';
    
//     // Fetch the JSON data from the URL
//     fetch(jsonUrl)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         return data
    
//       })
//       .catch((error) => {
//         console.error('There has been a problem with your fetch operation: \n' + error.message);
//       });

// }

// console.log(countryInformation())


async function countryInformation() {
    // Define the URL of the JSON file
    const jsonUrl = './data.json';
  
    try {
      // Fetch the JSON data from the URL
      const response = await fetch(jsonUrl);
  
      // Check for successful response
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse the response as JSON
      const data = await response.json();
  
      // Return the parsed country information
      return data;
    } catch (error) {
      console.error('There has been a problem with your fetch operation: \n' + error.message);
    }
  }


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
    population.innerHTML=`<span>Population:</span> <span>${data.population}</span>`;
    contryInfo.appendChild(population);

    const region=document.createElement('p');
    region.innerHTML=`<span>Region:</span> <span>${data.region}</span>`;
    contryInfo.appendChild(region);

    const capital=document.createElement('p');
    capital.innerHTML=`<span>Capital:</span> <span>${data.capital}</span>`;
    contryInfo.appendChild(capital);

    infoDiv.appendChild(h3);
    infoDiv.appendChild(contryInfo);

    mainDiv.appendChild(imageDiv);
    mainDiv.appendChild(infoDiv);

    mainContainer.appendChild(mainDiv);

  }

  function display_content(){
    const continent=document.getElementById('filter-dropdown').value
    console.log(continent)
  }
  
  (async () => {
    try {
      const contriesData = await countryInformation();
        contriesData.forEach(countryInfo => {
            displayCountry(countryInfo);
            
        });
    } catch (error) {
      console.error('Error fetching country information:', error);
    }
  })();


  