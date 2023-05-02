let commonKeyList = [
    "id",
    "userId",
    "user_id",
    "postId",
    "postid",
    "post_id",
    "albumId",
    "albumid",
    "album_id",
    "name",
    "email",
    "username",
    "userName",
    "user_name",
    "created_at",
    "createdat",
    "createdAt",
    "title",
    "count",
    "model",
    "amount",
    "quantity",
    "price",
    "money",
    "salary",
    "time",
    "date",
    "birthday",
    "birthDay",
    "birth_day",
    "year",
    "day",
    "month",
    "url",
    "image",
    "thumbnailUrl",
    "thumbnailurl",
    "thumbnail_url",
    "body",
    "content",
    "coin",
    "coins",
    "updated_at",
    "updatedat",
    "updatedAt",
    "completed",
    "status",
    "comment",
    "comments",
];

let isTestMode = true;

let retreavedData = new Array();
let commentContainer = document.getElementById("comments-container");

let checker = document.getElementById("is-test");
let input = document.getElementById("link-input");
let logs = document.querySelector(".logs");
let httpToggle = document.getElementById("http-toggle");

let fetchError = "";

let list = "";

async function StartFetching(){
    var url = isTestMode == true ? "http://127.0.0.1/api/comments.php" : `${httpToggle.innerText}${input.value}`;

    const response = await fetch(url).catch(err => {
        fetchError = `Error with data fetching; ${err}\nURL used: ${url}`;
    });

    if(fetchError == ""){
        var data = await response.json();
    
        for(var i in data){
            retreavedData.push(data [i]);
        }
    
        return list;
    }
}

function show(list){
    if(fetchError == ""){
        retreavedData.forEach(item => {
            list += "<li><ul>";

            commonKeyList.forEach(key => {
                if(item[key] !== undefined){
                    if(key == "image" || key == "thumbnailUrl" || key == "thumbnailurl" || key == "thumbnail_url"){
                        list += `<li><img class="post-image" src="${item[key]}"></li>`;
                    }else if(key == "url"){
                        list += `<li><a href="${item[key]}" style="font-style: italic; font-size: 15px;" target="_blank">Link</a></li>`;
                    }
                    else{
                        list += `<li>${item[key]}</li>`;
                    }
                }
            });

            list += "</ul><br><br></li>";
        });
        
        return commentContainer.innerHTML = `<ul>${list}</ul>`;
    }
}

function GetComments(){
    StartFetching();

    if(fetchError == ""){
        return show(list);
    }else{
        return logs.innerText = fetchError;
    }
}

function ClearComments(){
    let list = "";
    console.log(list);
    return commentContainer.innerHTML = '<ul></ul>';
}

function toggleTest(){
    checker.innerText = checker.innerText == "True" ? "False" : "True";
    isTestMode = checker.innerText == "True" ? true : false;

    SetProperties();

    return 0;
}

function toggleHTTP(){
    return httpToggle.innerText = httpToggle.innerText == "http://" ? "https://" : "http://";
}

function SetProperties(){
    checker.innerText = isTestMode == true ? "True" : "False";
    if(isTestMode){
        logs.style.display = "none";
        input.disabled = true;
        httpToggle.disabled = true;
        httpToggle.style.cursor = "default";
        httpToggle.style.background = "gray";
    }else{
        logs.style.display = "block";
        input.disabled = false;
        httpToggle.disabled = false;
        httpToggle.style.cursor = "pointer";
        httpToggle.style.background = "rgb(75, 155, 155)";
    }
    fetchError = "";
    console.clear();
}

SetProperties();
