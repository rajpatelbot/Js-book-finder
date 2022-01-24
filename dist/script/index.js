const search__Keyword = document.getElementById("search__Keyword");
const search__Btn = document.getElementById("search__Btn");
const API_KEY = "AIzaSyCFyGXTUxFAS1zoXIfps63jsUB-ssW3LWA";
let thumbnail,
  title,
  subtitle,
  desc,
  author,
  publishDate,
  identifier,
  pageCount,
  lg;
  
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

search__Btn.addEventListener("click", fetchData);

async function fetchData() {
  if (search__Keyword.value === "") return;
  msg.style.display = "none";
  loader.style.display = "block"
  try {
    const fetchResponse = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${search__Keyword.value}&key=${API_KEY}`
    );
    const data = await fetchResponse.json();
    showData(data);
  } catch (error) {
    // console.log(error);
    alert("Somthing got error");
  }
}

function showData(data) {
  allData.innerHTML = "";
  loader.style.display = "none"

  data.items.forEach((item) => {
    thumbnail = item.volumeInfo.imageLinks.smallThumbnail;
    title = item.volumeInfo.title;
    subtitle = item.volumeInfo.subtitle;
    desc = item.volumeInfo.description;
    publishDate = item.volumeInfo.publishedDate;
    author = item.volumeInfo.authors[0];
    identifier = item.volumeInfo.industryIdentifiers[1].identifier;
    pageCount = item.volumeInfo.pageCount;
    lg = item.volumeInfo.language;

    allData.innerHTML += formateOutut(thumbnail, title, author, subtitle, desc, publishDate, identifier, pageCount, lg);

  });
}

function formateOutut(thumbnail, title, author, subtitle, desc, publishDate, identifier, pageCount, lg) {
  var bookUrl = "./pages/reader.html?isbn=" + identifier;

  var htmlCard = `
  <div class="py-10">
    <div class="flex flex-col rounded items-center w-[80vw] max-w-screen-lg overflow-hidden sm:flex-row sm:w-[80vw] lg:w-[46vw]" style="box-shadow: 0 3px 10px rgb(0 0 0 / 20%); height:100%;">
      <img class="h-full w-full sm:w-4/12 md:w-3/12" src=${thumbnail} alt="img" id="bookImg">
      <div class="px-6 py-4 w-full">
        <h1 class="font-bold text-xl mb-2 text-sky-400" id="title">${title.slice(
          0,
          30
        )}</h1>
        <h3 class="font-normal mb-2 text-base id="subtitle">${
          subtitle ? subtitle : "Subtitle not present here"
        }</h3>

        <div class="grid grid-cols-2 gap-2 mt-5">
          <p class="bg-slate-200 text-sm p-1 text-center rounded-full" id="author"> <span class="text-sky-900""> Author : </span> ${author}</p>
          <p class="bg-slate-200 text-sm p-1 text-center rounded-full" id="publishDate"> <span class="text-sky-900""> Publish : </span> ${publishDate}</p>
          <p class="bg-slate-200 text-sm p-1 text-center rounded-full" id="pageCount"> <span class="text-sky-900""> Total Page : </span> ${pageCount}</p>
          <p class="bg-slate-200 text-sm p-1 text-center rounded-full" id="language"> <span class="text-sky-900""> Language : </span> ${lg}</p>
        </div>

        <div class="flex mt-2">
          <a class="p-1 w-full bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 text-center" href="${bookUrl}" target="_blank">Read</a>
          <button class="p-1 w-full ml-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" onClick="showModal('${title}', '${thumbnail}', '${desc}', '${bookUrl}')"> Show Details </button>
        </div>
      </div>
    </div>
  </div>`;

  return htmlCard;
}

// for model show
function showModal(title, thumbnail, desc, bookUrl){
  modal.style.display = "block";
  contentModal__Container.innerHTML = `<div class="py-10 md:h-[60vh]">
  <div class="rounded overflow-hidden shadow-lg flex items-center flex-col md:h-full md:overflow-hidden md:flex-row">
    <img class="w-11/12 md:h-full lg:w-6/12" src=${thumbnail} alt="img" id="bookImg" >
    <div class="px-6 py-4 w-full md:w-full md:h-full">
      <h1 class="font-bold text-xl mb-2 text-sky-400" id="title">${title}</h1>
      <hr>
      <h2 class="font-normal text-xl mb-2 text-black md:overflow-auto md:h-[75%]" id="desc">${
        desc === "undefined" ? "Description not available" : desc 
      }</h2>
      <a class="p-1 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 text-center" href="${bookUrl}" target="_blank">Read</a>
      </div>
  </div>
</div>`;
}

// for modal close
span.onclick = function() {
  modal.style.display = "none";
}