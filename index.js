const searchInput = document.getElementById("search-input");

function searchVideos(){
    let searchValue = searchInput.value;
    fetchVideos(searchValue);
}

async function fetchVideos(searchValue) {
    let endPoint = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchValue}&key=AIzaSyAbonMrU4wFfJbr92513MNk3eOeqG2-O6w`;

    try {
        let response = await fetch(endPoint);
        let result = await response.json();
        showThumbnails(result.items);
    } 
    catch (error) {
        alert("Something went wrong");
    }
}

function showThumbnails(items) {
    let thumbnailContainer = document.getElementById("thumbnail-container");
    thumbnailContainer.innerHTML = ""; // Clear the previous images
    
    for (let i = 0; i < items.length; i++){
        let videoItem = items[i];
        console.log(videoItem);
        let imageUrl = videoItem.snippet.thumbnails.high.url;
        let videoElement = document.createElement("div");
        videoElement.addEventListener("click", () =>{
            navigateToVideo(videoItem.id.videoId); // function call in 50 line
        })
        
        const videoChildren=`
        <img scr="${imageUrl}"/>
        <p id="title">${videoItem.snippet.title}</p>
        <p class="channel">${videoItem.snippet.channelTitle}</p>
        <p class="views">${videoItem.snippet.publishTime}</p>
        `;
        videoElement.innerHTML=videoChildren;
        videoElement.style.backgroundImage=`url(${imageUrl})`;
        videoElement.id=videoItem.id.videoId;
        let image=document.createElement("img");
        image.src=imageUrl;
        
        thumbnailContainer.appendChild(videoElement);
    }
}

function navigateToVideo(videoId){
    if(videoId){
        window.location.href = `https://www.youtube.com/watch?v=${videoId}`;
    }
    else{
        alert("You have No Authorize to acces this video")
    }



}
