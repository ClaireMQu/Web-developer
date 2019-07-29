var xHRObject = false;
if (window.XMLHttpRequest)
{
xHRObject = new XMLHttpRequest();
}
else if (window.ActiveXObject)
{
xHRObject = new ActiveXObject("Microsoft.XMLHTTP");
}


function getData()
{
    if ((xHRObject.readyState == 4) &&(xHRObject.status == 200))
    {
        var serverResponse = xHRObject.responseXML;
        var spantag = document.getElementById("cart");

        if (serverResponse != null){
            var header = serverResponse.getElementsByTagName("name");
            spantag.innerHTML = "";
            for (i=0; i<header.length; i++)
            {
           
            if (window.ActiveXObject)
            {
                spantag.innerHTML += " " +header[0].firstChild.text;
                spantag.innerHTML += " " + header[0].lastChild.text + " " + "<a href='#' onclick='AddRemoveItem(\"Remove\");'>Remove Item</a>";
            }
            else
            {
                spantag.innerHTML += " " +header[0].firstChild.textContent;
                spantag.innerHTML += " " + header[0].lastChild.textContent + " " + "<a href='#' onclick='AddRemoveItem(\"Remove\");'>Remove Item</a>";
            }
            }
        }
        else{  spantag.innerHTML = ""; }
    }
}

function AddRemoveItem(action)
{
          var name  = document.getElementById("name").innerHTML;
           
          if(action=="Add")
          {
            xHRObject.open("GET", "AddToCart.php?action=" + action + "&name=" + encodeURIComponent(name) + "&value=" + Number(new Date), true);
          }
          else
          {
           xHRObject.open("GET", "AddToCart.php?action=" + action + "&name=" + encodeURIComponent(name) + "&value="  + Number(new Date), true);
          }

          xHRObject.onreadystatechange = getData;
          xHRObject.send(null);   
}



